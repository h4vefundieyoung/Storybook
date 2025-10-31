import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat'; // ✅ Prettier flat config
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx)'], // optional: Storybook files
    plugins: { storybook },
    rules: {
      'storybook/hierarchy-separator': 'error',
      'storybook/default-exports': 'warn',
    },
  },
  prettier, // ✅ must be last to override formatting rules
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
