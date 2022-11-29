import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { sensorsInit } from './utils/sensorsData.js'
import './utils/onerror'
import './utils/performace'
import toast from './utils/toast'

console.log(toast)
const app = createApp(App)
window.$toast = toast;

app.mount('#app')
