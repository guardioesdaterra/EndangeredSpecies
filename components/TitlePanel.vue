<template>
  <div class="floating-panel title-panel">
    <h1>{{ t('appTitle') }}</h1>
    <p>{{ t('appSubtitle') }}</p>
    <div class="cr-badge-title">{{ t('crBadge') }}</div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLanguage()
</script>
