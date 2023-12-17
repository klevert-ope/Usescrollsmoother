import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = config => ({
	...config,
	input: 'src/useScrollSmoother.ts',
	external: (id) => !/^[./]/.test(id)
})

export default [
	bundle({
		plugins: [esbuild()],
		output: [
			{
				file: `scroll.js`,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: `scroll.mjs`,
				format: 'es',
				sourcemap: true,
			},
		],
	}),
	bundle({
		plugins: [dts()],
		output: {
			file: `scroll.d.ts`,
			format: 'es',
		},
	}),
]
