import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const Home = () => import("@/views/Home.vue");
const Manage = () => import("@/views/Manage.vue");
const Song = () => import("@/views/Song.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/songs/:id",
    name: "song",
    component: Song,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: "Home" });
  }
});

export default router;
