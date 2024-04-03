/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: {
					darkest: '#000000',
					darker: '#05060a',
					default: '#0a0b11',
					lighter: '#0f1017',
					lightest: '#1c1d26'
				}
			}
		}
	},
	plugins: []
};
