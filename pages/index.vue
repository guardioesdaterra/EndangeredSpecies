<template>
  <div class="map-wrapper">
    <TitlePanel />

    <FilterPanel
      v-if="filterOptions"
      :search="filters.search"
      :filters="{
        taxonomicGroup: filters.taxonomicGroup,
        region: filters.region,
        ecosystem: filters.ecosystem,
        threatType: filters.threatType
      }"
      :options="filterOptions"
      :filtered-species-count="filteredSpecies.length"
      :total-species-count="species.length"
      :has-active-filters="hasActiveFilters"
      :lang="lang"
      :languages="languages"
      @update:search="filters.search = $event"
      @update:taxonomic-group="filters.taxonomicGroup = $event"
      @update:region="filters.region = $event"
      @update:ecosystem="filters.ecosystem = $event"
      @update:threat-type="filters.threatType = $event"
      @update:lang="setLanguage($event)"
      @reset="resetFilters"
    />

    <LegendPanel />

    <AttributionOverlay />

    <SpeciesMap
      :species="species"
      :filtered-species="filteredSpecies"
      :active-region="activeRegion"
      @select-species="onSelectSpecies"
      @clear-range="activeRegion = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { Species, Filters } from '~/composables/useSpeciesData'

const { species, loadSpecies, filterSpecies, getFilterOptions } = useSpeciesData()
const { lang, languages, setLanguage } = useLanguage()
const { isDark } = useDarkMode()

// Apply dark mode class to body
watch(isDark, (dark) => {
  if (process.client) {
    document.body.classList.toggle('dark-mode', dark)
  }
}, { immediate: true })

const filters = reactive<Filters>({
  search: '',
  taxonomicGroup: '',
  region: '',
  ecosystem: '',
  threatType: ''
})

const filterOptions = ref<ReturnType<typeof getFilterOptions> | null>(null)
const activeRegion = ref<{ type: string; coordinates: number[][][] } | null>(null)

const filteredSpecies = computed(() => {
  return filterSpecies(species.value, filters)
})

const hasActiveFilters = computed(() => {
  return !!(
    filters.search ||
    filters.taxonomicGroup ||
    filters.region ||
    filters.ecosystem ||
    filters.threatType
  )
})

function resetFilters() {
  filters.search = ''
  filters.taxonomicGroup = ''
  filters.region = ''
  filters.ecosystem = ''
  filters.threatType = ''
  activeRegion.value = null
}

function onSelectSpecies(s: Species) {
  if (s.range) {
    activeRegion.value = s.range
  } else {
    activeRegion.value = null
  }
}

// Load species on mount
onMounted(async () => {
  const data = await loadSpecies()
  if (data.length > 0) {
    filterOptions.value = getFilterOptions(data)
  }
})
</script>
