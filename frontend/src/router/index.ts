// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from "vue3-cookies";

const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/dashboard",
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach(async (to, from, next) => {
  const { cookies } = useCookies();
  const token = cookies.get('token');

  if (token == null || token == '' || token == undefined) {
    if (to.name != 'Login') {
      return next({ name: 'Login' });
    }

    return next();
  }

  if (token != '' && token != null && token != undefined) {
    if (to.name === 'Login') {
      return next({name: 'Dashboard'});
    }

    const isTokenValid = await checkTokenHealth(token);

    if (!isTokenValid) {
      cookies.remove('token');
      return next({ name: 'Login' });
    }

    return next();
  }
})


const checkTokenHealth = async (token: string) => {
  const checkTokenURL = import.meta.env.VITE_API_URL + '/auth/check';

  try {
    const response = await fetch(checkTokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token
      })
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export default router
