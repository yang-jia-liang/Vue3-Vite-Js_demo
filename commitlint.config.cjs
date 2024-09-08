module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    'type-enum': [0],
    'scope-empty': [0, 'never'], // 允许没有 scope
  },
};