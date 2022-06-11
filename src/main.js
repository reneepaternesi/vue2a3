import { createApp } from 'vue'
import router from 'vue-router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'


const app = createApp(App)
app.use(router)

app.mount('#app')
