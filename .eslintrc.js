module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['**/*.@(story|stories).*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
          },
        ],
      },
    },
  ],
}
