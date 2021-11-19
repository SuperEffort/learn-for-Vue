import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import message from '@/utils/message'

const app = createApp(App)
app.config.globalProperties.message = message
app.use(router).use(ElementPlus)
app.mount('#app')
