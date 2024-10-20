import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the MotionPlugin
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(router).use(MotionPlugin)

app.mount('#app')