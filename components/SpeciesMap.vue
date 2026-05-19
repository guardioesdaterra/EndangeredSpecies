<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { createApp, h, onMounted, onBeforeUnmount } from 'vue'
import type { Species } from '~/composables/useSpeciesData'
import SpeciesPopup from './SpeciesPopup.vue'

interface Props {
  species: Species[]
  filteredSpecies: Species[]
  activeRegion: { type: string; coordinates: number[][][] } | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'select-species': [species: Species]
  'clear-range': []
}>()

const { lang, t } = useLanguage()
const { isDark } = useDarkMode()
const mapContainer = ref<HTMLDivElement>()
let map: L.Map | null = null
const markersLayer = ref<L.LayerGroup | null>(null)
const rangeLayer = ref<L.GeoJSON | null>(null)
let updateTimeout: ReturnType<typeof setTimeout> | null = null
let currentOpenMarker: L.Marker | null = null

// Cache markers by species ID for efficient diffing
const markerCache = new Map<string, L.Marker>()

// Track dynamically created Vue apps for popups to clean up
const popupApps = new Map<string, { app: any; el: HTMLElement }>()

// Taxonomic group colors - exact match from original Lg object
const groupColors: Record<string, string> = {
  Mammal: '#B64032',
  Bird: '#D97706',
  Amphibian: '#5A8F3C',
  Reptile: '#7C3AED',
  Fish: '#2563EB',
  Plant: '#15803D',
  Invertebrate: '#DB2777'
}

function getBorderColor(): string {
  return isDark.value ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)'
}

function createDivIcon(species: Species): L.DivIcon {
  const color = groupColors[species.taxonomicGroup] ?? '#B64032'
  const borderColor = getBorderColor()
  return L.divIcon({
    className: 'species-dot',
    html: `<div class="species-dot-inner" style="width:14px;height:14px;background:${color};border:2px solid ${borderColor};border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}

function initMap() {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    center: [20, 0],
    zoom: 2,
    zoomControl: false,
    fadeAnimation: true,
    markerZoomAnimation: true
  })

  // Add zoom control to bottom-right corner
  L.control.zoom({ position: 'bottomright' }).addTo(map)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  markersLayer.value = L.layerGroup().addTo(map)

  // Fix Leaflet default marker icon issue
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
  })

  // Update markers once map is ready
  updateMarkers()
}

function updateMarkers() {
  if (!markersLayer.value || !map) return

  // Cancel pending update
  if (updateTimeout !== null) {
    clearTimeout(updateTimeout)
    updateTimeout = null
  }

  // Wait for zoom animation to complete
  if (map.isAnimatingZoom() || (map as any)._zooming) {
    updateTimeout = setTimeout(updateMarkers, 50)
    return
  }

  const currentIds = new Set(props.filteredSpecies.map(s => s.id))
  const cachedIds = new Set(markerCache.keys())

  // Remove markers that are no longer in the filtered list
  const toRemove = new Set<string>()
  cachedIds.forEach(id => {
    if (!currentIds.has(id)) {
      toRemove.add(id)
    }
  })

  toRemove.forEach(id => {
    const marker = markerCache.get(id)
    if (marker) {
      markersLayer.value!.removeLayer(marker)
      markerCache.delete(id)
    }
    const popup = popupApps.get(id)
    if (popup) {
      popup.app.unmount()
      popupApps.delete(id)
    }
  })

  // Add new markers or update existing ones
  props.filteredSpecies.forEach(species => {
    const existingMarker = markerCache.get(species.id)

    if (existingMarker) {
      // Update icon if dark mode changed
      existingMarker.setIcon(createDivIcon(species))
      return
    }

    // Create new marker
    const marker = L.marker([species.lat, species.lng], {
      icon: createDivIcon(species)
    })

    // Attach click handler
    marker.on('click', () => {
      emit('select-species', species)

      // If this marker's popup is already open, close it
      if (currentOpenMarker === marker && map!.getPopup()) {
        closeCurrentPopup()
        return
      }

      openPopup(species, marker)
    })

    markerCache.set(species.id, marker)
    markersLayer.value!.addLayer(marker)
  })
}

function closeCurrentPopup() {
  if (map) {
    map.closePopup()
  }
  currentOpenMarker = null
}

function openPopup(species: Species, marker: L.Marker) {
  if (!map) return

  // Close any existing popup first
  map.closePopup()

  // Clean up existing popup for this species
  const existingPopup = popupApps.get(species.id)
  if (existingPopup) {
    existingPopup.app.unmount()
    popupApps.delete(species.id)
  }

  const el = document.createElement('div')
  el.classList.add('species-popup-content')

  const app = createApp({
    render: () => h(SpeciesPopup, {
      species,
      hasRange: !!species.range,
      lang: lang.value,
      onClearRange: () => emit('clear-range')
    })
  })

  app.mount(el)

  popupApps.set(species.id, { app, el })

  // Track current open marker
  currentOpenMarker = marker

  // Calculate responsive autoPan padding based on viewport
  // Larger padding on mobile to avoid UI overlays
  const vw = window.innerWidth
  const vh = window.innerHeight
  const isMobile = vw <= 480

  const paddingX = isMobile ? Math.max(vw * 0.06, 20) : Math.min(vw * 0.08, 60)
  const paddingY = isMobile ? Math.max(vh * 0.18, 80) : Math.min(vh * 0.12, 80)

  // Create popup with smart positioning
  marker.bindPopup(el, {
    maxWidth: isMobile ? Math.min(vw - 20, 380) : Math.min(vw - 40, 380),
    minWidth: 260,
    autoPan: true,
    autoPanPaddingTopLeft: [paddingX, paddingY],
    autoPanPaddingBottomRight: [paddingX, paddingY],
    keepInView: true,
    className: 'species-popup-wrapper',
    closeOnClick: false,
    autoClose: false
  }).openPopup()

  // Pan map to ensure popup is fully visible after it opens
  // Wait for popup to render so we can measure it
  setTimeout(() => {
    if (!map) return

    const popupElement = el.closest('.leaflet-popup')
    if (popupElement) {
      const popupRect = popupElement.getBoundingClientRect()
      const mapRect = map.getContainer().getBoundingClientRect()

      // Check if popup is going off-screen
      const offLeft = popupRect.left < mapRect.left + paddingX
      const offRight = popupRect.right > mapRect.right - paddingX
      const offTop = popupRect.top < mapRect.top + paddingY
      const offBottom = popupRect.bottom > mapRect.bottom - paddingY

      // If popup is off-screen, pan to center it
      if (offLeft || offRight || offTop || offBottom) {
        const markerLatLng = marker.getLatLng()
        const popupWidth = popupRect.width
        const popupHeight = popupRect.height

        // Calculate the ideal center point (popup appears above marker)
        const offsetLatLng = L.latLng(
          markerLatLng.lat + (popupHeight / 111320) * 0.5,
          markerLatLng.lng
        )

        map.panTo(offsetLatLng, {
          animate: true,
          duration: 0.3,
          noMoveStart: true
        })
      }
    }

    // Scroll popup to top
    const popupContent = el.closest('.leaflet-popup-content')
    if (popupContent) {
      (popupContent as HTMLElement).scrollTop = 0
    }
  }, 150)
}

function updateRangePolygon() {
  if (!map) return

  // Remove existing range
  if (rangeLayer.value) {
    map.removeLayer(rangeLayer.value)
    rangeLayer.value = null
  }

  if (props.activeRegion) {
    rangeLayer.value = L.geoJSON(
      { type: 'Polygon', coordinates: props.activeRegion.coordinates },
      {
        style: {
          color: '#10BFAE',
          weight: 2,
          opacity: 0.8,
          fillColor: '#10BFAE',
          fillOpacity: 0.12
        }
      }
    ).addTo(map)

    map.fitBounds(rangeLayer.value.getBounds(), { padding: [50, 50] })
  }
}

// Initialize map
onMounted(() => {
  initMap()

  // Handle viewport changes (mobile keyboard, orientation, etc)
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  if (!map) return

  // Invalidate size to trigger Leaflet's internal resize
  map.invalidateSize()

  // Update any open popup with new sizing
  const openPopup = map.popup
  if (openPopup) {
    const options = openPopup.options
    const vw = window.innerWidth
    const isMobile = vw <= 480
    options.maxWidth = isMobile ? Math.min(vw - 20, 380) : Math.min(vw - 40, 380)
  }
}

// Update markers when filtered species change with debouncing
watch(() => props.filteredSpecies, () => {
  // Debounce to prevent rapid successive updates during heavy movements
  if (updateTimeout !== null) {
    clearTimeout(updateTimeout)
  }
  updateTimeout = setTimeout(() => {
    updateMarkers()
    updateTimeout = null
  }, 100)
}, { deep: true })

// Update range polygon when active region changes
watch(() => props.activeRegion, () => {
  updateRangePolygon()
}, { deep: true })

// Update popup language on language change
watch(lang, () => {
  updateMarkers()
})

// Update markers when dark mode toggles (for border color change)
watch(isDark, () => {
  updateMarkers()
})

// Cleanup on unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (updateTimeout !== null) {
    clearTimeout(updateTimeout)
    updateTimeout = null
  }
  popupApps.forEach(({ app }) => app.unmount())
  popupApps.clear()
  markerCache.clear()
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

:deep(.species-dot) {
  transition: transform 0.2s ease;
}

:deep(.species-dot-inner) {
  animation: markerFadeIn 0.3s ease-out;
}

@keyframes markerFadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

:deep(.leaflet-popup-content) {
  transition: opacity 0.2s ease;
}
</style>
