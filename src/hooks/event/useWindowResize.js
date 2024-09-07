import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core'

export const useWindowResize = (fn, delay = 0) => {
  const debouncedFn = useDebounceFn(() => {
    fn()
  }, delay)

  tryOnMounted(() => {
    window.addEventListener('resize', debouncedFn)
  })

  tryOnUnmounted(() => {
    window.removeEventListener('resize', debouncedFn)
  })
}
