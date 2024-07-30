import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import AssignedReports from "../views/AssignedReports.vue";
import CompletedInspections from "../views/CompletedInspections.vue";
import InstellingBeheer from "../views/InstellingBeheer.vue";
import KnowledgeBase from "../views/KnowledgeBase.vue";
import LoginForm from "../views/LoginForm.vue"; // Aangepast pad

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/assigned-reports",
    name: "AssignedReports",
    component: AssignedReports,
    meta: { requiresAuth: true },
  },
  {
    path: "/completed-inspections",
    name: "CompletedInspections",
    component: CompletedInspections,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "InstellingBeheer",
    component: InstellingBeheer,
    meta: { requiresAuth: true },
  },
  {
    path: "/knowledge-base",
    name: "KnowledgeBase",
    component: KnowledgeBase,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("auth")) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
