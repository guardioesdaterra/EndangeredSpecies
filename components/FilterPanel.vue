<template>
  <div>
    <!-- Mobile Filter Toggle Button -->
    <button
      class="mobile-filter-toggle"
      :class="{ active: isOpen }"
      @click="toggleFilter"
      :aria-label="t('filterSpecies')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
      <span class="mobile-toggle-text">{{ t('filter') }}</span>
      <span v-if="hasActiveFilters" class="filter-count-badge">{{ filteredSpeciesCount }}</span>
    </button>

    <!-- Mobile Backdrop -->
    <div
      class="mobile-panel-backdrop"
      :class="{ active: isOpen }"
      @click="closeFilter"
    ></div>

    <!-- Filter Panel -->
    <div
      class="floating-panel filter-panel"
      :class="{ 'filter-panel-open': isOpen }"
      ref="panelRef"
    >
      <h2>{{ t('filterSpecies') }}</h2>

      <input
        class="filter-search"
        type="text"
        :placeholder="t('searchPlaceholder')"
        :value="search"
        @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        :aria-label="t('searchPlaceholder')"
      />

      <div class="filter-group">
        <span class="filter-label">{{ t('taxonomicGroup') }}</span>
        <select
          class="filter-select"
          :value="filters.taxonomicGroup"
          @change="$emit('update:taxonomicGroup', ($event.target as HTMLSelectElement).value)"
          :aria-label="t('taxonomicGroup')"
        >
          <option value="">{{ t('allGroups') }}</option>
          <option v-for="group in options.taxonomicGroups" :key="group" :value="group">
            {{ tTaxonomic(group) }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <span class="filter-label">{{ t('region') }}</span>
        <select
          class="filter-select"
          :value="filters.region"
          @change="$emit('update:region', ($event.target as HTMLSelectElement).value)"
          :aria-label="t('region')"
        >
          <option value="">{{ t('allRegions') }}</option>
          <option v-for="r in options.regions" :key="r" :value="r">
            {{ tRegion(r) }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <span class="filter-label">{{ t('ecosystem') }}</span>
        <select
          class="filter-select"
          :value="filters.ecosystem"
          @change="$emit('update:ecosystem', ($event.target as HTMLSelectElement).value)"
          :aria-label="t('ecosystem')"
        >
          <option value="">{{ t('allEcosystems') }}</option>
          <option v-for="eco in options.ecosystems" :key="eco" :value="eco">
            {{ tEcosystem(eco) }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <span class="filter-label">{{ t('threatType') }}</span>
        <select
          class="filter-select"
          :value="filters.threatType"
          @change="$emit('update:threatType', ($event.target as HTMLSelectElement).value)"
          :aria-label="t('threatType')"
        >
          <option value="">{{ t('allThreats') }}</option>
          <option v-for="threat in options.threatTypes" :key="threat" :value="threat">
            {{ tThreat(threat) }}
          </option>
        </select>
      </div>

      <div class="filter-count">
        {{ t('showing', filteredSpeciesCount, totalSpeciesCount) }}
      </div>

      <button
        v-if="hasActiveFilters"
        class="reset-btn"
        @click="$emit('reset')"
      >
        {{ t('resetFilters') }}
      </button>

      <div class="filter-group lang-group">
        <span class="filter-label">{{ t('language') }}</span>
        <select
          class="filter-select"
          :value="lang"
          @change="$emit('update:lang', ($event.target as HTMLSelectElement).value)"
          :aria-label="t('language')"
        >
          <option v-for="{ code, label } in languages" :key="code" :value="code">
            {{ label }}
          </option>
        </select>
      </div>

      <button
        class="dark-mode-toggle"
        @click="toggleDarkMode"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  search: string
  filters: {
    taxonomicGroup: string
    region: string
    ecosystem: string
    threatType: string
  }
  options: {
    taxonomicGroups: string[]
    regions: string[]
    ecosystems: string[]
    threatTypes: string[]
  }
  filteredSpeciesCount: number
  totalSpeciesCount: number
  hasActiveFilters: boolean
  lang: string
  languages: { code: string; label: string }[]
}

defineProps<Props>()

defineEmits<{
  'update:search': [value: string]
  'update:taxonomicGroup': [value: string]
  'update:region': [value: string]
  'update:ecosystem': [value: string]
  'update:threatType': [value: string]
  'update:lang': [value: string]
  'reset': []
}>()

const { t, tTaxonomic, tRegion, tEcosystem, tThreat } = useLanguage()
const { isDark, toggleDarkMode } = useDarkMode()

const isOpen = ref(true)
const panelRef = ref<HTMLElement | null>(null)

function toggleFilter() {
  isOpen.value = !isOpen.value
}

function closeFilter() {
  isOpen.value = false
}

// Close panel on escape key
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    closeFilter()
  }
}

// Only on mobile, start closed
function checkMobile() {
  if (process.client) {
    return window.innerWidth <= 480
  }
  return false
}

onMounted(() => {
  if (checkMobile()) {
    isOpen.value = false
  }
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Watch for orientation/resize changes
if (process.client) {
  window.addEventListener('resize', () => {
    if (checkMobile() && isOpen.value) {
      // Keep open if already open, just let CSS handle animation
    }
  })
}
</script>
