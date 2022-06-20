import { derived } from 'svelte/store'
// https://routify.dev/docs/helpers
import {
  afterPageLoad,
  beforeUrlChange,
  goto,
  isActive,
  isChangingPage,
  layout,
  ready,
  redirect,
  url,
  route,
  page,
  params,
  prefetch,
  Router,
} from '@roxi/routify'

const back = derived([goto, route], ([$goto, $route]) => {
  if ($route.last.path) {
    return (options = {}) => {
      if (options.useHistory) {
        return window.history.back()
      }
      return $goto($route.last.path, $route.last.params)
    }
  }
  return () => window.history.back()
})

export {
  prefetch,
  afterPageLoad,
  back,
  beforeUrlChange,
  goto,
  isActive,
  layout,
  url,
  redirect,
  ready,
  route,
  page,
  params,
  isChangingPage,
  Router,
}
