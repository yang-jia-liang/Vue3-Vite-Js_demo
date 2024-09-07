<template>
  <div class="tw-flex tw-items-center tw-bg-C1" v-if="showHeader">
    <img src="@/assets/images/common/platform_banner.png" alt="" height="29" />

    <div class="tw-bg-A4 tw-overflow-hidden">
      <el-menu mode="horizontal" :key="menuKey">
        <el-menu-item
          v-for="menu in menuList"
          :key="menu.name"
          @click="jumpPage(menu.name, menu.path)"
        >
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <div class="tw-flex tw-items-center tw-ml-auto tw-flex-1 tw-justify-end">
      <el-dropdown placement="bottom-start" trigger="click">
        <el-icon :size="20">
          <ep-Bell />
        </el-icon>

        <template #dropdown>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="type in noticeTypeList"
              :label="type.name"
              :name="type.name"
              :key="type.name"
            >
              <ul>
                <li v-for="notice in type.list" :key="notice">{{ notice }}</li>
                <li>查看更多</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-dropdown>

      <el-avatar
        :size="50"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />

      <el-dropdown placement="bottom-start" trigger="click">
        <span class="tw-whitespace-nowrap">{{ userInfo.name }}</span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>{{ userInfo.name }}</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useWindowResize } from '@/hooks/event/useWindowResize.js'
  import * as commonHttp from '@/api/common.js'
  import { tokenUtils } from '@/utils/common.js'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/stores/user.js'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()
  const name = computed(() => route.name)
  const showHeader = computed(() => name.value !== 'login')

  const router = useRouter()
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)

  const menuList = reactive([
    { name: '我的工作台', path: '/home' },
    { name: '学校官网', path: 'http://hfwps.hsfz.net.cn:5555/' },
    { name: '校园应用', path: '/campus_application' },
    { name: '智学网', path: 'http://hfwps.hsfz.net.cn:5555/' },
    { name: '学科网', path: 'http://hfwps.hsfz.net.cn:5555/' },
    { name: '箐优网', path: 'http://hfwps.hsfz.net.cn:5555/' },
    { name: '海航官网', path: 'http://hfwps.hsfz.net.cn:5555/' },
    { name: '奥校官网', path: 'http://hfwps.hsfz.net.cn:5555/' },
    { name: 'WPS正版软件管理与服务平台', path: 'http://hfwps.hsfz.net.cn:5555/' }
  ])

  const activeName = ref('通知')
  const noticeTypeList = reactive([
    { name: '通知', list: ['通知1', '通知2'] },
    { name: '消息', list: ['消息1', '消息2'] },
    { name: '待办', list: ['待办1', '待办2'] }
  ])

  const jumpPage = (name, path) => {
    if (!['我的工作台', '校园应用'].includes(name)) {
      window.open(path, '_blank')
      return
    }

    router.push(path)
  }

  const handleClick = (tab, event) => {
    console.log(tab, event)
  }

  const logout = () => {
    commonHttp.logout().then(() => {
      tokenUtils.clear();
      router.push('/login')
    })
  }

  const menuKey = ref(Date.now())
  const refreshMenu = () => (menuKey.value = Date.now())
  useWindowResize(refreshMenu, 200)
</script>
