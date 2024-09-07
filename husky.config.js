module.exports = {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS", // 避免绕过git cz，直接git commit
    // "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true", // git commit 触发 git cz
  }
}