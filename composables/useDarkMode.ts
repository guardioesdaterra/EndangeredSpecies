export function useDarkMode() {
  const isDark = useState<boolean>('darkMode', () => false)

  function toggleDarkMode() {
    isDark.value = !isDark.value
  }

  function setDarkMode(value: boolean) {
    isDark.value = value
  }

  return {
    isDark,
    toggleDarkMode,
    setDarkMode
  }
}
