import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth:true }
    },  {
      path: '/actor',
      name: 'actor',
      component: () => import('../views/ActorView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        next();
      }
      else {
        next('/');
      }
    }) 
  }
  else {
    next();
  } 
}
)

export default router
