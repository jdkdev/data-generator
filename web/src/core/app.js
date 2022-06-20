import { writable } from 'svelte/store'

export const currentUser = writable(null)
export const currentAccount = writable(null)

export const apiUrl = import.meta.env.VITE_API_URL
