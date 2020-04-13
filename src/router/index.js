import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routers'
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; 
Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  history: false,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

// 解决多次push路由报‘XXX is not allowed’
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;
