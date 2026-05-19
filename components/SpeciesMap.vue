<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { createApp, h, onBeforeUnmount } from 'vue'
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

function createDivIcon(species: Species): L.DivIcon {
  const color = groupColors[species.taxonomicGroup] ?? '#B64032'
  const borderColor = isDark.value ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.85)'
  return L.divIcon({
    className: 'species-dot',
    html: `<div style="width:14px;height:14px;background:${color};border:2px solid ${borderColor};border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}

function initMap() {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    center: [20, 0],
    zoom: 2,
    zoomControl: true
  })

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
}

function updateMarkers() {
  if (!markersLayer.value || !map) return

  // Clear existing markers and popup apps
  markersLayer.value.clearLayers()
  popupApps.forEach(({ app }) => app.unmount())
  popupApps.clear()

  props.filteredSpecies.forEach(species => {
    const marker = L.marker([species.lat, species.lng], {
      icon: createDivIcon(species)
    })

    marker.on('click', () => {
      emit('select-species', species)

      const el = document.createElement('div')
      const app = createApp({
        render: () => h(SpeciesPopup, {
          species,
          hasRange: !!species.range,
          lang: lang.value,
          onClearRange: () => emit('clear-range')
        })
      })

      app.mount(el)

      const popupKey = species.id
      popupApps.set(popupKey, { app, el })

      marker.bindPopup(el, {
        maxWidth: 380,
        minWidth: 340,
        autoPan: true
      }).openPopup()
    })

    markersLayer.value!.addLayer(marker)
  })
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
})

// Update markers when filtered species change
watch(() => props.filteredSpecies, () => {
  updateMarkers()
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
  popupApps.forEach(({ app }) => app.unmount())
  popupApps.clear()
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
</style>
