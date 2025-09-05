/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210, 30%, 95%)',
        accent: 'hsl(130, 60%, 45%)',
        primary: 'hsl(210, 70%, 50%)',
        surface: 'hsl(210, 30%, 100%)',
        'text-primary': 'hsl(210, 20%, 20%)',
        'text-secondary': 'hsl(210, 20%, 40%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'lg': '0 10px 15px hsla(0, 0%, 0%, 0.1)',
        'md': '0 4px 6px hsla(0, 0%, 0%, 0.1)',
        'sm': '0 1px 2px hsla(0, 0%, 0%, 0.05)',
        'card': '0 2px 8px hsla(210, 30%, 10%, 0.08)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
