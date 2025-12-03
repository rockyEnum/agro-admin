import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import VueTianditu from 'vue-tianditu'
import './main.css'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(VueTianditu, {
  v: '4.0',
  tk: '89c275f45280dafa212081b0e9cdce7b'
})
 
app.mount('#app')

