<template>
  <div class="floating-panel legend-panel">
    <div class="legend-title">{{ t('speciesGroups') }}</div>
    <div
      v-for="group in groups"
      :key="group.name"
      class="legend-row"
    >
      <div class="legend-dot" :style="{ background: group.color }"></div>
      <span class="legend-label">{{ tTaxonomic(group.name) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, tTaxonomic } = useLanguage()

// Exact colors from original: Lg={Mammal:"#B64032",Bird:"#D97706",Amphibian:"#5A8F3C",Reptile:"#7C3AED",Fish:"#2563EB",Plant:"#15803D",Invertebrate:"#DB2777"}
const groups = [
  { name: 'Mammal', color: '#B64032' },
  { name: 'Bird', color: '#D97706' },
  { name: 'Amphibian', color: '#5A8F3C' },
  { name: 'Reptile', color: '#7C3AED' },
  { name: 'Fish', color: '#2563EB' },
  { name: 'Plant', color: '#15803D' },
  { name: 'Invertebrate', color: '#DB2777' }
]
</script>
