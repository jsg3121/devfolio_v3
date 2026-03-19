import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'FunctionDeclaration',
          message: '함수 선언문 대신 화살표 함수 표현식을 사용하세요.',
        },
      ],
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      'astro/no-unused-css-selectors': 'warn',
    },
  },
];
