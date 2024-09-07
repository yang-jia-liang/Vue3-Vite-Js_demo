import './styles/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import RouterGuard from "./router/guard.js"

const app = createApp(App)

app.use(createPinia())
app.use(router)
RouterGuard(router)

app.mount('#app')
