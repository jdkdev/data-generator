// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'
import forms from 'windicss/plugin/forms'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import lineClamp from 'windicss/plugin/line-clamp'

export default defineConfig({
  verbose: true,
  silent: false,
  debug: true,
  compile: true, // false: interpretation mode; true: compilation mode
  globalPreflight: true, // set preflight style is global or scoped
  globalUtility: true, // set utility style is global or scoped
  darkMode: 'class', // or 'media'

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Roboto Slab"', 'serif'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        theme: {
          primary: '#0d83dd', // blue
          secondary: '#E5E7EB', // gray-200
          tertiary: '#8B5CF6', // purple-500
          text: '#444',
          accent: '#25C4F2', // logo-blue
          highlight: '#F9A8D4', // pink-light
          nav: '#0d83dd', // blue
          active: '#017BCE', // blue
          hover: '#003b64', // blue
          success: '#28A745', // green
          danger: '#DC3545', // red
          info: '#17A2B8', // blue
          warning: '#FFC107', // yellow
          muted: colors.coolGray['400'], // gray
          light: colors.coolGray['500'], // gray
        },
        gray: colors.coolGray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.skew-10deg': {
          transform: 'skewY(-10deg)',
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)',
        },
      }
      addUtilities(newUtilities)
    }),
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a',
          },
        },
      }
      addComponents(buttons)
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic(
        'skew',
        ({ Utility, theme }) => {
          return Utility.handler
            .handleStatic(theme('skew'))
            .handleNumber(0, 360, 'int', (number) => `skewY(-${number}deg)`)
            .createProperty('transform')
        },
        variants('skew')
      )

      addDynamic(
        '?',
        ({ Utility, Style, Keyframes }) => {
          if (Utility.raw === '?') {
            return Keyframes.generate('question', {
              '0%': {
                'box-shadow':
                  'inset 4px 4px rgb(236, 15, 170), inset -4px -4px rgb(236, 15, 170)',
              },
              '100%': {
                'box-shadow':
                  'inset 8px 8px rgb(236, 15, 170), inset -8px -8px rgb(236, 15, 170)',
              },
            })
          }
        },
        {
          layer: 'utilities',
          group: 'question',
          completions: ['?'],
        }
      )
    }),
    forms,
    aspectRatio,
    lineClamp,
  ],
})
