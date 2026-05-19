<template>
  <div class="popup-card">
    <template v-if="!imgError">
      <img
        class="popup-img"
        :src="species.imageUrl"
        :alt="species.commonName"
        loading="lazy"
        @error="imgError = true"
      />
    </template>
    <div v-if="imgError" class="popup-img-fallback">
      <span>{{ t('imageUnavailable') }}</span>
    </div>

    <div class="popup-body">
      <div class="popup-header">
        <div class="popup-names">
          <h3>{{ species.commonName }}</h3>
          <em>{{ species.scientificName }}</em>
        </div>
        <span class="cr-badge">{{ t('crBadge') }}</span>
      </div>

      <div class="popup-meta">
        <span class="meta-tag">{{ tTaxonomic(species.taxonomicGroup) }}</span>
        <span class="meta-tag">{{ tRegion(species.region) }}</span>
        <span class="meta-tag">{{ tEcosystem(species.ecosystem) }}</span>
      </div>

      <div class="popup-section">
        <div class="popup-section-label">{{ t('about') }}</div>
        <p>{{ getContent(species, lang, 'description') }}</p>
      </div>

      <div class="popup-section">
        <div class="popup-section-label">{{ t('whyEndangered') }}</div>
        <p>{{ getContent(species, lang, 'endangerment') }}</p>
      </div>

      <div class="popup-section">
        <div class="popup-section-label">{{ t('ecosystemNeeds') }}</div>
        <p>{{ getContent(species, lang, 'ecosystemNeeds') }}</p>
      </div>

      <div class="popup-section">
        <div class="popup-section-label">{{ t('howYouCanHelp') }}</div>
        <p>{{ getContent(species, lang, 'actions') }}</p>
      </div>

      <div class="popup-section">
        <div class="popup-section-label">{{ t('mainThreats') }}</div>
        <div class="threat-tags">
          <span v-for="threat in species.threatTypes" :key="threat" class="threat-tag">
            {{ tThreat(threat) }}
          </span>
        </div>
      </div>

      <div class="popup-footer">
        <span class="image-credit">{{ species.imageCredit }}</span>
        <button
          v-if="hasRange"
          class="clear-range-btn"
          @click="$emit('clear-range')"
        >
          {{ t('clearRegion') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Species } from '~/composables/useSpeciesData'
import { getContent } from '~/composables/useSpeciesData'

interface Props {
  species: Species
  hasRange: boolean
  lang: string
}

const props = defineProps<Props>()
defineEmits<{
  'clear-range': []
}>()

const { t, tTaxonomic, tRegion, tEcosystem, tThreat } = useLanguage()
const imgError = ref(false)

watch(() => props.species, () => {
  imgError.value = false
})
</script>
