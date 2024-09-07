<template>
  <div>
    <div>home</div>

    <el-button @click="jumpPage('/score_query')">成绩查询</el-button>
    <el-button @click="jumpPage('/score_import')">成绩导入</el-button>
    <el-button @click="jumpPage()">other</el-button>
  </div>
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
