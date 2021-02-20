module.exports = {
  extends: 'get-off-my-lawn',
  rules: {
      'max-params': ['error', 4],
      'new-cap': [2, { "capIsNewExceptions" : ['Touchable', 'Ripple']}],
      'node/no-unpublished-import': 0,
      'react/prop-types': 0,
      'react/prefer-stateless-function': 0,
      'jest/consistent-test-it': 0,
      'react/no-set-state': 0,
      'react/no-direct-mutation-state': 0,
      'react/no-did-mount-set-state': 0,
      'react/no-did-update-set-state': 0,
      'react/no-access-state-in-setstate': 0,
      'import/exports-last': 0,
      'max-nested-callbacks': 0
  }
};
