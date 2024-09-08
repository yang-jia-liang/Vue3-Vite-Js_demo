module.exports = {
  types: [
    { value: 'update',   name: 'update:   功能开发阶段性提交' },
    { value: 'feat',     name: 'feat:     完整新功能提交' },
    { value: 'fix',      name: 'fix:      修复Bug' },
    { value: 'perf',     name: 'perf:     性能优化（在不影响代码内部行为的前提下，对程序性能进行优化）' },
    { value: 'refactor', name: 'refactor: 代码重构（在不影响代码内部行为、功能下的代码修改）' },
    { value: 'docs',     name: 'docs:     只修改了文档相关的文件（e.g. 修改README.md）' },
    { value: 'style',    name: 'style:    代码风格、不影响代码功能的更改（e.g. 修改空格缩进，换行规范）' },
    { value: 'build',    name: 'build:    影响项目构建或依赖项修改（e.g. 升级webpack到版本5）' },
    { value: 'chore',    name: 'chore:    构建过程、辅助工具等相关的内容修改（e.g. 更新依赖库）' },
    { value: 'revert',   name: 'revert:   恢复上一次提交（e.g. 回滚feat: 增加用户注册功能）' },
  ],

  scopes: [],

  messages: {
    type: '选择一种你提交的类型(必选):',
    scope: '\n自定义更改范围(可选):',
    customScope: 'What is the scope of this change:',
    subject: '短说明(必填):\n',
    body: '长说明, 使用"|"换行(可选):\n',
    breaking: '列举非兼容性的重大变更(可选):\n',
    footer: '关联关闭的issue, 例如: #31, #34(可选)\n',
    confirmCommit: '确认提交?',
  },

  allowBreakingChanges: ['update', 'feat', 'fix'],

  // skipQuestions: ['scope'],
  // defaultScope: '___CUSTOM___:',

  // allowCustomScopes: true,
  // allowEmptyScopes: true,
  //
  // 自定义 `scope` 提示文本
  customScopes: {
    default: 'none1111', // 默认值
    prompt: '请输入自定义范围3333:', // 自定义范围的提示
  },
};
