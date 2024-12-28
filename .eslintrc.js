/** @type {import('eslint').Linter.Config} */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-undef': 'off',
    'no-extra-semi': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'react/no-find-dom-node': 'off',
    'react/prop-types': 'off',
    'react/no-children-prop': 'off',
    'no-inner-declarations': 'off',
    'no-prototype-builtins': 'off',

    'no-debugger': 'warn',
    'no-unreachable': 'warn',

    'no-redeclare': 'off',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-dupe-class-members': ['error'],

    // Warnings
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off'
  }
}
