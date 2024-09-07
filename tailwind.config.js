const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',

  content: ['./src/**/*.vue'],

  theme: {
    colors: {
      C1: 'var(--C1)',
      C2: 'var(--C2)',
      C3: 'var(--C3)',
      C4: 'var(--C4)',

      F1: 'var(--F1)',
      F2: 'var(--F2)',
      F3: 'var(--F3)',

      A1: 'var(--A1)',
      A2: 'var(--A2)',
      A3: 'var(--A3)',
      A4: 'var(--A4)',
      A5: 'var(--A5)',
      A6: 'var(--A6)',
      A7: 'var(--A7)',
      A8: 'var(--A8)',
      A9: 'var(--A9)',
      A10: 'var(--A10)',
      A11: 'var(--A11)',
      A12: 'var(--A12)',

      D1: 'var(--D1)',
      D2: 'var(--D2)',
      D3: 'var(--D3)',
      D4: 'var(--D4)',
      D5: 'var(--D5)',
      D6: 'var(--D6)',
      D7: 'var(--D7)',
      D8: 'var(--D8)',
      D9: 'var(--D9)',
      D10: 'var(--D10)',
      D11: 'var(--D11)',
      D12: 'var(--D12)',
      D13: 'var(--D13)',
      D14: 'var(--D14)',
      D15: 'var(--D15)'
    },

    fontFamily: {
      BebasNeue: 'Bebas Neue-Regular, Bebas Neue'
    },

    // 响应式间距
    spacing: () =>
      Array(60)
        .fill(undefined)
        .reduce((prev, cur, index) => {
          // prev[index + 1] = `${index + 1}px`;
          prev[index + 1] = `${((index + 1) / 1920) * 100}vw`
          return prev
        }, {}),

    // 响应式圆角
    borderRadius: {
      4: `${(4 / 1920) * 100}vw`,
      6: `${(6 / 1920) * 100}vw`,
      8: `${(8 / 1920) * 100}vw`,
      50: '50%'
    },
    borderWidth: {
      DEFAULT: '1px'
    },
    borderColor: (theme) => ({
      ...theme('colors')
    }),

    width: {
      xs: '128px',
      s: '264px',
      m: '400px',
      l: '536px',
      xl: '672px',
      full: '100%',
      fit: 'fit-content'
    },

    height: {
      s: '32px',
      m: '40px',
      full: '100%'
    },

    // extend是在提供的默认选项的基础上进行扩展
    // 写在theme下面则是替换默认提供的选项，这样体积会小点，编译也快点
    extend: {}
  },

  plugins: [
    plugin(({ addComponents, addUtilities }) => {
      // 字体大小+行高
      const FONTSIZE = {
        12: ['var(--font12)', 'calc(var(--font12) + 8px)'],
        14: ['var(--font14)', 'calc(var(--font14) + 8px)'],
        16: ['var(--font16)', 'calc(var(--font16) + 8px)'],
        18: ['var(--font18)', 'calc(var(--font18) + 8px)'],
        20: ['var(--font20)', 'calc(var(--font20) + 8px)'],
        24: ['var(--font24)', 'calc(var(--font24) + 8px)']
      }
      // 固定字体类名 (T1(B)-T6(B)、D1(B)-D6(B)、T*-[1-4])
      const FONTS = {
        1: 24,
        2: 20,
        3: 18,
        4: 16,
        5: 14,
        6: 12
      }
      let components = {}
      Object.entries(FONTS).forEach((f) => {
        const size = {
          fontSize: FONTSIZE[f[1]][0],
          lineHeight: FONTSIZE[f[1]][1]
        }
        components[`.T${f[0]}`] = { ...size }
        components[`.T${f[0]}B`] = { ...size, fontWeight: 'bold' }
      })

      addComponents({
        '.flex-center-center': {
          '@apply tw-flex tw-justify-center tw-items-center': true
        },

        ...components
      })

      addUtilities({
        '.b-1': {
          border: '1px solid var(--border-base)'
        }
      })
    })
  ],

  /**
   * @desc 明确使用的核心插件列表，减少构建体积，加快构建速度
   * @doc https://v2.tailwindcss.com/docs/configuration#core-plugins
   * */
  corePlugins: [
    'margin',
    'padding',
    'textColor',
    'backgroundColor',
    'textAlign',
    'display',
    'fontFamily',
    'gridTemplateColumns',
    'gap',
    'container',
    'flexDirection',
    'flex',
    'flexWrap',
    'justifyContent',
    'alignItems',
    'borderWidth',
    'borderColor',
    'borderStyle',
    'borderRadius',
    'position',
    'width',
    'height',
    'cursor',
    'boxSizing',
    'pointerEvents',
    'overflow',
    'whitespace'
  ],

  /**
   * 不需要响应版本，以减小构建的体积
   * @doc https://v2.tailwindcss.com/docs/optimizing-for-production#purge-css-options
   * */
  variants: {
    // appearance: [],
  }
}
