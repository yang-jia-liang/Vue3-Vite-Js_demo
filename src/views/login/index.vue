<template>
  <el-button @click="login">登录</el-button>
</template>

<script setup>
  import * as commonHttp from '@/api/common.js'
  import { dataUtils, tokenUtils } from '@/utils/common.js'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const login = () => {
    commonHttp
      .login({
        phone: '13800138000',
        password: dataUtils.encrypt('ql123456'),
        type: 2
      })
      .then(({ access_token }) => {
        tokenUtils.set(access_token)

        router.replace('/home')
      })
  }
</script>

<style scoped></style>
