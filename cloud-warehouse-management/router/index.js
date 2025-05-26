import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  // 动态路由参数
  { path: '/user/:id', name: 'User', component: () => import('../views/User.vue') },
  // 404 页面
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
];

const router = createRouter({
  history: createWebHistory(), // 也可用 createWebHashHistory()
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为控制
    return savedPosition || { top: 0 };
  }
});

export default router;