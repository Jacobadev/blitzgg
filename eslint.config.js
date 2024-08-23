import antfu from '@antfu/eslint-config'
import vue from 'eslint-plugin-vue'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  ...tailwind.configs['flat/recommended'],
  ...vue.configs['flat/strongly-recommended'],
  rules: {
    'style/indent': 'off',
    'style/indent-binary-ops': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'vue/html-indent': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-line': 'off',
    'vue/html-closing-bracket-newline': 'off',
  },
  typescript: {
    tsconfigPath: [
      'tsconfig.json',
      'tsconfig.app.json',
      'tsconfig.node.json',
      'tsconfig.vitest.json',
    ],
  },
  ignores: [
    './src/components/ui/',
    'cypress/',
    'src/test/',
    './.eslintrc.cjs',
    './.eslintrc.cjs/**',
    'babel.config.js',
    '**/babel.config.js/**',
    'jest.config.js',
    '**/jest.config.js/**',
    'src/shims-vue.d.ts',
    'src/shims-vue.d.ts/**',
    'src/shims-tsx.d.ts',
    'src/shims-tsx.d.ts/**',
  ],
  eslint: {
    cache: true,
  },

  vue: {
    sfcBlocks: {
      defaultLanguage: {
        script: 'ts',
      },
    },
  },
})
