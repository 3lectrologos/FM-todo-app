import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config

export default config
