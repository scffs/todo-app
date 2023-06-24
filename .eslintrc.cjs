module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: ['standard', 'airbnb', 'airbnb-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  settings: {
    react: {
      version: '^18.2.0',
    },
  },
  rules: {
    quotes: ['error', 'single'],
    semi: [1, 'always'],
    indent: 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.{ts,tsx,js,jsx}'] }],
    'max-len': ['warn', { code: 120 }],
    'jsx-quotes': [2, 'prefer-single'],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
    {
      files: ['*.tsx'],
      rules: {
        quotes: ['error', 'single'],
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
