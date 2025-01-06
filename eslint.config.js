import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
// import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      // Code style
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'no-multi-spaces': ['error'],
      'brace-style': ['error', '1tbs'],
      // 'comma-dangle': ['error', 'always-multiline'],

      // Best practices
      'no-unused-vars': ['error'],
      'eqeqeq': ['error', 'always'],
      'no-console': ['warn'],
      'no-debugger': 'error',
      'curly': ['error', 'all'],
      'no-undef': 'error',
      'consistent-return': 'error',

      // Error prevention
      'no-empty': 'error',
      'no-constant-condition': 'error',
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error',

      // Vue specific
      'vue/no-unused-vars': 'error',
      'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
      'vue/require-default-prop': 'error',
      // 'vue/singleline-html-element-content-newline': ['error', {
      //   'singleline': 'always',
      //   'multiline': 'never'
      // }],

      // Import/export
      // 'import/no-unresolved': 'off',
      // 'import/order': ['error', {
      //   'groups': [
      //     ['builtin', 'external'],
      //     ['internal', 'sibling', 'parent', 'index']
      //   ],
      //   'alphabetize': { 'order': 'asc' }
      // }],
      // 'import/newline-after-import': 'error',
    }
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  ...pluginVue.configs['flat/essential'],
];