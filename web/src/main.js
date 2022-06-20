import App from '@/App.svelte'
import 'virtual:frontier'

import '@/app.scss'

import 'virtual:windi.css'
import 'virtual:windi-devtools'

import HMR from '@roxi/routify/hmr'

const app = HMR(App, { target: document.body }, 'app')

export default app
