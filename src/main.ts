import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//@ts-ignore
import { sensorsInit } from './utils/sensorsData.js'
import './utils/onerror'
import './utils/performace'
//@ts-ignore
import toast from './utils/toast.js'

console.log(toast)
const app = createApp(App)
//@ts-ignore
window.$toast = toast;

app.mount('#app')
