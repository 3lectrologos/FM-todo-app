import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#ffffff',
      lt_circle_gray: '#E3E4F1',
      dt_circle_gray: '#393A4B',

      dt_pattern_bg: '#171823',

      lt_list_text: '#494C6B',
      lt_list_text_light: '#9495A5',
      lt_list_text_very_light: '#9495A5',
      lt_list_text_extra_light: '#D1D2DA',
      dt_list_text: '#C8CBE7',
      dt_list_text_light: '#767992',
      dt_list_text_very_light: '#5B5E7E',
      dt_list_text_extra_light: '#4D5067',

      dt_list_bg: '#25273D',

      lt_veryLightGray: '#FAFAFA',
      lt_veryLightGrayishBlue: '#F2F2F2',
      lt_lightGrayishBlue: '#D9DBE9',
      lt_darkGrayishBlue: '#6E7E85',
      lt_veryDarkGrayishBlue: '#4F5D75',

      dt_veryDarkBlue: '#1E213A',
      dt_veryDarkDesaturatedBlue: '#121721',
      dt_lightGrayishBlue: '#E9EDF0',
      dt_lightGrayishBlueHover: '#F2F2F2',
      dt_darkGrayishBlueHover: '#6E7E85',
      dt_veryDarkGrayishBlue: '#4F5D75',
      dt_veryDarkGrayishBlueHover: '#4F5D75',

      highlight: '#b91c1c',
      active: '#3A7CFD',
    },
    screens: {
      tablet: '600px',
    },
    boxShadow: {
      lt_list: '0px 35px 50px -15px rgba(194, 195, 214, 0.50)',
      dt_list: '0px 35px 50px -15px rgba(0, 0, 0, 0.50)',
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'selector',
}
export default config
