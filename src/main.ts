import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icons'

/** element-Plus图标的全局注册 */

const app = createApp(App)
app.use(icons) // 插件的安装, 这个registerIcons函数会被自动调用,传入一个app
app.use(store)
app.use(router)
app.mount('#app')
