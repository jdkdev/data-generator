import { mdsvex } from 'mdsvex'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  hot: !isProduction,
  emitCss: true,
  extensions: ['.md', '.svx', '.svelte'],
  preprocess: [
    mdsvex({
      extensions: ['.svx', '.md'],
    }),
  ],
}
