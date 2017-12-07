// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './components/app/app';
import routes from './routes';

require('font-awesome/css/font-awesome.css');

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(VueResource);
Vue.use(ElementUI);

const router = new Router({ routes });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
