/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  // 解决 'process' is not defined ｜ 'require' is not defined ｜ 'module' is not defined
  env: {
    browser: true,
    es6: true,
    node: true // 添加 Node.js 环境
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 生产环境禁用 console 和 debugger，并给出提示
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 解决 setup 组件不能直接设置 name 属性导致的报错 Component name "xxx" should always be multi-word
    'vue/multi-word-component-names': 'off'
  }
}
