<template>
  <div>校园应用</div>

  <el-button @click="jumpPage('/supervision_list')">督办列表</el-button>
  <el-button @click="jumpPage()">公文系统</el-button>

  <router-view />
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter();

  const jumpPage = (path) => {
    if (path) {
      router.push(path)
    } else {
      window.open('http://hfwps.hsfz.net.cn:5555/', "_black")
    }
  }
</script>