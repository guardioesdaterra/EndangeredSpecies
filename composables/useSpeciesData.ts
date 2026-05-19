export interface Species {
  id: string
  commonName: string
  scientificName: string
  category: string
  taxonomicGroup: string
  region: string
  ecosystem: string
  lat: number
  lng: number
  imageUrl: string
  imageCredit: string
  description: string
  endangerment: string
  ecosystemNeeds: string
  actions: string
  threatTypes: string[]
  iucnUrl: string
  range: {
    type: string
    coordinates: number[][][]
  }
  content: Record<string, {
    description: string
    endangerment: string
    ecosystemNeeds: string
    actions: string
    region: string
  }>
}

export interface Filters {
  search: string
  taxonomicGroup: string
  region: string
  ecosystem: string
  threatType: string
}

export interface FilterOptions {
  taxonomicGroups: string[]
  regions: string[]
  ecosystems: string[]
  threatTypes: string[]
}

export function useSpeciesData() {
  const species = ref<Species[]>([])
  const loaded = ref(false)

  async function loadSpecies() {
    if (loaded.value) return species.value
    try {
      const data = await $fetch<Species[]>('/data/species.json')
      species.value = data
      loaded.value = true
      return data
    } catch (e) {
      console.error('Failed to load species data:', e)
      return []
    }
  }

  function filterSpecies(allSpecies: Species[], filters: Filters): Species[] {
    return allSpecies.filter(s => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (!s.commonName.toLowerCase().includes(q) && !s.scientificName.toLowerCase().includes(q)) {
          return false
        }
      }
      if (filters.taxonomicGroup && s.taxonomicGroup !== filters.taxonomicGroup) return false
      if (filters.region && s.region !== filters.region) return false
      if (filters.ecosystem && s.ecosystem !== filters.ecosystem) return false
      if (filters.threatType && !s.threatTypes.includes(filters.threatType)) return false
      return true
    })
  }

  function getFilterOptions(allSpecies: Species[]): FilterOptions {
    return {
      taxonomicGroups: [...new Set(allSpecies.map(s => s.taxonomicGroup))].sort(),
      regions: [...new Set(allSpecies.map(s => s.region))].sort(),
      ecosystems: [...new Set(allSpecies.map(s => s.ecosystem))].sort(),
      threatTypes: [...new Set(allSpecies.flatMap(s => s.threatTypes))].sort()
    }
  }

  return {
    species,
    loaded,
    loadSpecies,
    filterSpecies,
    getFilterOptions
  }
}

// Helper to get translated content with English fallback (matches original Vi function)
export function getContent(species: Species, lang: string, key: string): string {
  const content = species.content?.[lang]?.[key as keyof NonNullable<typeof species.content[string]>]
  if (content) return content
  const enContent = species.content?.en?.[key as keyof NonNullable<typeof species.content[string]>]
  if (enContent) return enContent
  return (species as any)[key] ?? ''
}
