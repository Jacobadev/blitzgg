import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import { BlitzRepository } from '@/domain/usecases/SummonerRepository'
const app = createApp(App)
app.use(router)

app.provide('repo', BlitzRepository)
app.mount('#app')
