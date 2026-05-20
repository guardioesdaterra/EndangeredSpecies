// UI strings - exact match from original JS bundle
const translations: Record<string, Record<string, any>> = {
  en: {
    appTitle: 'Critically Endangered Species Map',
    appSubtitle: 'Explore wildlife on the edge of extinction around the globe.',
    filterSpecies: 'Filter species',
    searchPlaceholder: 'Search by name\u2026',
    taxonomicGroup: 'Taxonomic group',
    region: 'Region',
    ecosystem: 'Ecosystem',
    threatType: 'Threat type',
    allGroups: 'All groups',
    allRegions: 'All regions',
    allEcosystems: 'All ecosystems',
    allThreats: 'All threats',
    showing: (count: number, total: number) => `Showing ${count} of ${total} species`,
    speciesGroups: 'Species groups',
    clearRegion: 'Clear region',
    about: 'About',
    whyEndangered: 'Why endangered',
    ecosystemNeeds: 'Ecosystem needs',
    howYouCanHelp: 'How you can help',
    mainThreats: 'Main threats',
    imageUnavailable: 'Image unavailable',
    language: 'Language',
    resetFilters: 'Reset filters',
    crBadge: 'CR \u00b7 Critically Endangered',
    filter: 'Filter',
    close: 'Close'
  },
  es: {
    appTitle: 'Mapa de Especies en Peligro Cr\u00edtico',
    appSubtitle: 'Explora la fauna al borde de la extinci\u00f3n en todo el mundo.',
    filterSpecies: 'Filtrar especies',
    searchPlaceholder: 'Buscar por nombre\u2026',
    taxonomicGroup: 'Grupo taxon\u00f3mico',
    region: 'Regi\u00f3n',
    ecosystem: 'Ecosistema',
    threatType: 'Tipo de amenaza',
    allGroups: 'Todos los grupos',
    allRegions: 'Todas las regiones',
    allEcosystems: 'Todos los ecosistemas',
    allThreats: 'Todas las amenazas',
    showing: (count: number, total: number) => `Mostrando ${count} de ${total} especies`,
    speciesGroups: 'Grupos de especies',
    clearRegion: 'Borrar regi\u00f3n',
    about: 'Acerca de',
    whyEndangered: 'Por qu\u00e9 est\u00e1 en peligro',
    ecosystemNeeds: 'Necesidades del ecosistema',
    howYouCanHelp: 'C\u00f3mo puedes ayudar',
    mainThreats: 'Amenazas principales',
    imageUnavailable: 'Imagen no disponible',
    language: 'Idioma',
    resetFilters: 'Restablecer filtros',
    crBadge: 'CR \u00b7 En Peligro Cr\u00edtico',
    filter: 'Filtro',
    close: 'Cerrar'
  },
  pt: {
    appTitle: 'Mapa de Esp\u00e9cies em Perigo Cr\u00edtico',
    appSubtitle: 'Explore a fauna \u00e0 beira da extin\u00e7\u00e3o ao redor do globo.',
    filterSpecies: 'Filtrar esp\u00e9cies',
    searchPlaceholder: 'Buscar por nome\u2026',
    taxonomicGroup: 'Grupo taxon\u00f4mico',
    region: 'Regi\u00e3o',
    ecosystem: 'Ecossistema',
    threatType: 'Tipo de amea\u00e7a',
    allGroups: 'Todos os grupos',
    allRegions: 'Todas as regi\u00f5es',
    allEcosystems: 'Todos os ecossistemas',
    allThreats: 'Todas as amea\u00e7as',
    showing: (count: number, total: number) => `Exibindo ${count} de ${total} esp\u00e9cies`,
    speciesGroups: 'Grupos de esp\u00e9cies',
    clearRegion: 'Limpar regi\u00e3o',
    about: 'Sobre',
    whyEndangered: 'Por que est\u00e1 em perigo',
    ecosystemNeeds: 'Necessidades do ecossistema',
    howYouCanHelp: 'Como voc\u00ea pode ajudar',
    mainThreats: 'Principais amea\u00e7as',
    imageUnavailable: 'Imagem indispon\u00edvel',
    language: 'Idioma',
    resetFilters: 'Redefinir filtros',
crBadge: 'CR \u00b7 Em Perigo Cr\u00edtico',
    filter: 'Filtro',
    close: 'Fechar'
  },
  pt: {
    appTitle: 'Mapa de Esp\u00e9cies em Perigo Cr\u00edtico',
    appSubtitle: 'Explore a fauna \u00e0 beira da extin\u00e7\u00e3o ao redor do globo.',
    filterSpecies: 'Filtrar esp\u00e9cies',
    searchPlaceholder: 'Buscar por nome\u2026',
    taxonomicGroup: 'Grupo taxon\u00f4mico',
    region: 'Regi\u00e3o',
    ecosystem: 'Ecossistema',
    threatType: 'Tipo de amea\u00e7a',
    allGroups: 'Todos os grupos',
    allRegions: 'Todas as regi\u00f5es',
    allEcosystems: 'Todos os ecossistemas',
    allThreats: 'Todas as amea\u00e7as',
    showing: (count: number, total: number) => `Exibindo ${count} de ${total} esp\u00e9cies`,
    speciesGroups: 'Grupos de esp\u00e9cies',
    clearRegion: 'Limpar regi\u00e3o',
    about: 'Sobre',
    whyEndangered: 'Por que est\u00e1 em perigo',
    ecosystemNeeds: 'Necessidades do ecossistema',
    howYouCanHelp: 'Como voc\u00ea pode ajudar',
    mainThreats: 'Principais amea\u00e7as',
    imageUnavailable: 'Imagem indispon\u00edvel',
    language: 'Idioma',
    resetFilters: 'Redefinir filtros',
    crBadge: 'CR \u00b7 Em Perigo Cr\u00edtico',
    filter: 'Filtro',
    close: 'Fechar'
  },
  fr: {
    appTitle: 'Carte des Esp\u00e8ces en Danger Critique',
    appSubtitle: 'Explorez la faune au bord de l\'extinction \u00e0 travers le monde.',
    filterSpecies: 'Filtrer les esp\u00e8ces',
    searchPlaceholder: 'Rechercher par nom\u2026',
    taxonomicGroup: 'Groupe taxonomique',
    region: 'R\u00e9gion',
    ecosystem: '\u00c9cosyst\u00e8me',
    threatType: 'Type de menace',
    allGroups: 'Tous les groupes',
    allRegions: 'Toutes les r\u00e9gions',
    allEcosystems: 'Tous les \u00e9cosyst\u00e8mes',
    allThreats: 'Toutes les menaces',
    showing: (count: number, total: number) => `Affichage de ${count} sur ${total} esp\u00e8ces`,
    speciesGroups: 'Groupes d\'esp\u00e8ces',
    clearRegion: 'Effacer la r\u00e9gion',
    about: '\u00c0 propos',
    whyEndangered: 'Pourquoi en danger',
    ecosystemNeeds: 'Besoins de l\'\u00e9cosyst\u00e8me',
    howYouCanHelp: 'Comment vous pouvez aider',
    mainThreats: 'Menaces principales',
    imageUnavailable: 'Image indisponible',
    language: 'Langue',
    resetFilters: 'R\u00e9initialiser les filtres',
    crBadge: 'CR \u00b7 En Danger Critique',
    filter: 'Filtre',
    close: 'Fermer'
  }
}

// Taxonomic group translations - exact match
const taxonomicTranslations: Record<string, Record<string, string>> = {
  en: { Mammal: 'Mammal', Bird: 'Bird', Amphibian: 'Amphibian', Reptile: 'Reptile', Fish: 'Fish', Plant: 'Plant', Invertebrate: 'Invertebrate' },
  es: { Mammal: 'Mam\u00edfero', Bird: 'Ave', Amphibian: 'Anfibio', Reptile: 'Reptil', Fish: 'Pez', Plant: 'Planta', Invertebrate: 'Invertebrado' },
  pt: { Mammal: 'Mam\u00edfero', Bird: 'Ave', Amphibian: 'Anf\u00edbio', Reptile: 'R\u00e9ptil', Fish: 'Peixe', Plant: 'Planta', Invertebrate: 'Invertebrado' },
  fr: { Mammal: 'Mammif\u00e8re', Bird: 'Oiseau', Amphibian: 'Amphibien', Reptile: 'Reptile', Fish: 'Poisson', Plant: 'Plante', Invertebrate: 'Invert\u00e9br\u00e9' }
}

// Ecosystem translations - exact match
const ecosystemTranslations: Record<string, Record<string, string>> = {
  en: { Alpine: 'Alpine', Desert: 'Desert', Forest: 'Forest', Freshwater: 'Freshwater', Grassland: 'Grassland', Island: 'Island', Marine: 'Marine', Mountain: 'Mountain', Wetland: 'Wetland' },
  es: { Alpine: 'Alpino', Desert: 'Desierto', Forest: 'Bosque', Freshwater: 'Agua dulce', Grassland: 'Pradera', Island: 'Isla', Marine: 'Marino', Mountain: 'Monta\u00f1a', Wetland: 'Humedal' },
  pt: { Alpine: 'Alpino', Desert: 'Deserto', Forest: 'Floresta', Freshwater: '\u00c1gua doce', Grassland: 'Campo', Island: 'Ilha', Marine: 'Marinho', Mountain: 'Montanha', Wetland: 'P\u00e2ntano' },
  fr: { Alpine: 'Alpin', Desert: 'D\u00e9sert', Forest: 'For\u00eat', Freshwater: 'Eau douce', Grassland: 'Prairie', Island: '\u00cele', Marine: 'Marin', Mountain: 'Montagne', Wetland: 'Zone humide' }
}

// Threat translations - exact match
const threatTranslations: Record<string, Record<string, string>> = {
  en: { Bycatch: 'Bycatch', 'Climate change': 'Climate change', Disease: 'Disease', 'Habitat loss': 'Habitat loss', 'Invasive species': 'Invasive species', Poaching: 'Poaching', Pollution: 'Pollution' },
  es: { Bycatch: 'Captura incidental', 'Climate change': 'Cambio clim\u00e1tico', Disease: 'Enfermedad', 'Habitat loss': 'P\u00e9rdida de h\u00e1bitat', 'Invasive species': 'Especies invasoras', Poaching: 'Caza furtiva', Pollution: 'Contaminaci\u00f3n' },
  pt: { Bycatch: 'Captura acidental', 'Climate change': 'Mudan\u00e7a clim\u00e1tica', Disease: 'Doen\u00e7a', 'Habitat loss': 'Perda de habitat', 'Invasive species': 'Esp\u00e9cies invasoras', Poaching: 'Ca\u00e7a ilegal', Pollution: 'Polui\u00e7\u00e3o' },
  fr: { Bycatch: 'Prise accessoire', 'Climate change': 'Changement climatique', Disease: 'Maladie', 'Habitat loss': 'Perte d\'habitat', 'Invasive species': 'Esp\u00e8ces envahissantes', Poaching: 'Braconnage', Pollution: 'Pollution' }
}

// Region translations - exact match
const regionTranslations: Record<string, Record<string, string>> = {
  en: { Caribbean: 'Caribbean', 'Central America': 'Central America', 'Central Asia': 'Central Asia', 'East Asia': 'East Asia', Europe: 'Europe', 'Global Tropics': 'Global Tropics', 'Indo-Pacific': 'Indo-Pacific', Islands: 'Islands', 'Middle East': 'Middle East', 'North Africa': 'North Africa', 'North America': 'North America', Oceania: 'Oceania', 'South America': 'South America', 'South Asia': 'South Asia', 'Southeast Asia': 'Southeast Asia', 'Sub-Saharan Africa': 'Sub-Saharan Africa' },
  es: { Caribbean: 'Caribe', 'Central America': 'Am\u00e9rica Central', 'Central Asia': 'Asia Central', 'East Asia': 'Asia Oriental', Europe: 'Europa', 'Global Tropics': 'Tr\u00f3picos mundiales', 'Indo-Pacific': 'Indo-Pac\u00edfico', Islands: 'Islas', 'Middle East': 'Oriente Medio', 'North Africa': '\u00c1frica del Norte', 'North America': 'Am\u00e9rica del Norte', Oceania: 'Ocean\u00eda', 'South America': 'Am\u00e9rica del Sur', 'South Asia': 'Asia Meridional', 'Southeast Asia': 'Asia Suroriental', 'Sub-Saharan Africa': '\u00c1frica Subsahariana' },
  pt: { Caribbean: 'Caribe', 'Central America': 'Am\u00e9rica Central', 'Central Asia': '\u00c1sia Central', 'East Asia': '\u00c1sia Oriental', Europe: 'Europa', 'Global Tropics': 'Tr\u00f3picos mundiais', 'Indo-Pacific': 'Indo-Pac\u00edfico', Islands: 'Ilhas', 'Middle East': 'Oriente M\u00e9dio', 'North Africa': '\u00c1frica do Norte', 'North America': 'Am\u00e9rica do Norte', Oceania: 'Oceania', 'South America': 'Am\u00e9rica do Sul', 'South Asia': '\u00c1sia Meridional', 'Southeast Asia': 'Sudeste Asi\u00e1tico', 'Sub-Saharan Africa': '\u00c1frica Subsaariana' },
  fr: { Caribbean: 'Cara\u00efbes', 'Central America': 'Am\u00e9rique centrale', 'Central Asia': 'Asie centrale', 'East Asia': 'Asie de l\'Est', Europe: 'Europe', 'Global Tropics': 'Tropiques mondiaux', 'Indo-Pacific': 'Indo-Pacifique', Islands: '\u00celes', 'Middle East': 'Moyen-Orient', 'North Africa': 'Afrique du Nord', 'North America': 'Am\u00e9rique du Nord', Oceania: 'Oc\u00e9anie', 'South America': 'Am\u00e9rique du Sud', 'South Asia': 'Asie du Sud', 'Southeast Asia': 'Asie du Sud-Est', 'Sub-Saharan Africa': 'Afrique subsaharienne' }
}

// Language options
const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Espa\u00f1ol' },
  { code: 'pt', label: 'Portugu\u00eas' },
  { code: 'fr', label: 'Fran\u00e7ais' }
]

export function useLanguage() {
  const lang = useState<string>('language', () => 'en')

  function t(key: string, ...args: any[]): string {
    const dict = translations[lang.value] ?? translations.en
    const value = dict[key] ?? translations.en[key] ?? key
    if (typeof value === 'function') return value(...args)
    return value
  }

  function tTaxonomic(key: string): string {
    const dict = taxonomicTranslations[lang.value] ?? taxonomicTranslations.en
    return dict[key] ?? key
  }

  function tEcosystem(key: string): string {
    const dict = ecosystemTranslations[lang.value] ?? ecosystemTranslations.en
    return dict[key] ?? key
  }

  function tThreat(key: string): string {
    const dict = threatTranslations[lang.value] ?? threatTranslations.en
    return dict[key] ?? key
  }

  function tRegion(key: string): string {
    const dict = regionTranslations[lang.value] ?? regionTranslations.en
    return dict[key] ?? key
  }

  function setLanguage(code: string) {
    lang.value = code
  }

  return {
    lang,
    languages,
    t,
    tTaxonomic,
    tEcosystem,
    tThreat,
    tRegion,
    setLanguage
  }
}
