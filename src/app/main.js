// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from '../services/vuestic-ui'
import store from '../store/index'
import router from '../router/index'
import { VuesticPlugin } from '../services/vuestic-ui/components'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'
import VueToast from 'vue-toast-notification'
import VueCryptojs from 'vue-cryptojs'

// importando axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// axios.defaults.baseURL = './abrageo';

import '../metrics'
import '../registerServiceWorker'

import { consoleBuildInfo } from 'vue-cli-plugin-build-info/plugin'
import 'vue-toast-notification/dist/theme-sugar.css'
// axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// URL base de nuestra API
// axios.defaults.baseURL = 'http://localhost:3000/abrageo';
axios.defaults.baseURL = 'https://portal.abracol.co/abrageo'

consoleBuildInfo()
Vue.use(VueToast)
Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use(VueCryptojs)

Vue.use(ColorThemePlugin, {
  // override colors here.
})

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
