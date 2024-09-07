<template>
  <div class="tw-flex" v-if="showAside">
    <el-menu
      default-active="/scoreInquiry"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item :index="item.path" v-for="item in asideList" @click="jumpPage(item.path)">
        <el-icon><ep-Menu /></el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </el-menu>

    <el-button type="primary" @click="isCollapse = !isCollapse" class="tw-mt-50">
      <ep-Edit />
    </el-button>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

  const route = useRoute()
  const router = useRouter()
  const name = computed(() => route.name)
  const showAside = computed(() =>
    ['score_query', 'score_import', 'supervision_list'].includes(name.value)
  )

  const asideList = reactive([
    { name: '成绩查询', path: '/score_query' },
    { name: '成绩导入', path: '/score_import' },
    { name: 'other', path: '2' },
    { name: 'other', path: '3' },
    { name: 'other', path: '4' },
    { name: 'other', path: '5' },
    { name: 'other', path: '6' },
    { name: 'other', path: '7' },
    { name: 'other', path: '8' },
    { name: 'other', path: '9' }
  ])

  const isCollapse = ref(false)
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }

  const jumpPage = (path) => {
    if (!path.startsWith('/')) {
      return
    }

    router.push(path)
  }
</script>

<style lang="less" scoped>
  .el-menu--collapse {
    width: 0;
    overflow: hidden;
  }
</style>
