module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?!?: ([A-Z]+-\d+) (.*)$/,
      headerCorrespondence: ['type', 'scope', 'ticket', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'add',
      ],
    ],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};
