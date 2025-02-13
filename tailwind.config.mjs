/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [{pattern: /cookie-consent.*/ },],
	theme: {
		extend: {
			aspectRatio: {
				'4/5': '4 / 5',
			},
			colors: {
				'text': 'var(--text)',
				'base-100': 'var(--base-100)',
				'base-200': 'var(--base-200)',
				'base-300': 'var(--base-300)',
				'primary': 'var(--primary)',
				'primary-content': 'var(--primary-content)',
				'secondary': 'var(--secondary)',
				'accent': 'var(--accent)',
			},
			listStyleType: {
				square: 'square',
				roman: 'roman',
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--text)',
						a: {
							color: 'var(--text)',
							'&:hover': {
								color: 'var(--primary)',
							},
						},
						h1: {
							color: 'var(--primary)',
						},
						h2: {
							color: 'var(--primary)',
						}
					}
				}
			}
		},
		fontSize: {
			sm: '0.750rem',
			base: '1rem',
			lg: '1.2rem',
			xl: '1.333rem',
			'2xl': '1.777rem',
			'3xl': '2.369rem',
			'4xl': '3.158rem',
			'5xl': '4.210rem',
		},
		fontFamily: {
			heading: ['Noto Sans', ...defaultTheme.fontFamily.sans],
			body: ['Inclusive Sans', ...defaultTheme.fontFamily.sans],
			mono: defaultTheme.fontFamily.mono,
		},
		fontWeight: {
			normal: '400',
			bold: '700',
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
