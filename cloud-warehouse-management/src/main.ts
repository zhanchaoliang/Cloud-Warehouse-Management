import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
App.use(Antd).mount('#app');
