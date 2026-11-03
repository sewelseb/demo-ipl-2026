import js from '@eslint/js';
import globals from 'globals';

export default [
    { ignores: ['coverage/**'] },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
        rules: {
            'prefer-const': 'error',
            eqeqeq: ['error', 'always'],
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },
    {
        files: ['**/*.test.js'],
        languageOptions: { globals: globals.jest },
    },
];
