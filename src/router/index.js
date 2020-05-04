import Vue from "vue";
import VueRouter from "vue-router";
import UserSelection from "../views/UserSelection.vue";
import ListOfChats from "../views/ListOfChats.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserSelection",
    component: UserSelection
  },
  {
    path: "/select-chat",
    name: "ListOfChats",
    component: ListOfChats,
    props: true
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
