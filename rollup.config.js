import babel from '@rollup/plugin-babel';

export default [
	{
		input: './src/index.js',
		output: {
			file: 'dist/esm/index.js',
			format: 'esm',
		},
	},

	{
		input: './src/index.js',
		output: {
			file: 'dist/cjs/index.js',
			format: 'cjs',
			exports: 'named',
		},
		plugins: [
			babel( { babelHelpers: 'bundled' } ),
		],
	},
];
