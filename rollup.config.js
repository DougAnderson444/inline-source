import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
import typescript from '@rollup/plugin-typescript'

import json from '@rollup/plugin-json'
import pkg from './package.json'

const onwarn = ({ message }) =>
  message.includes('@rollup/plugin-typescript TS2315')

export default
  {
    input: './index.js',
    output: [{
      sourcemap: true,
      format: 'es',
      dir: 'dist/inline-source/',
      chunkFileNames: "index.js",
      entryFileNames: "index.js"
    }
    ],
    plugins: [
      json(),
      svelte({
        emitCss: true, // default: true
        extensions: ['.svelte', '.svx'],
      }),
      css({ output: 'bundle.css' }),

      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      globals(),
      builtins(),
      typescript(),
      // terser()
    ],
    onwarn
  }
