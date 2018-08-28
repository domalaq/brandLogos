import 'bulma'
import Vue from 'vue'
import store from './store/index'
// import './app.scss'
import Admins from './components/admins/index.vue'
import Brands from './components/brands/index.vue'
import Products from './components/products/index.vue'
import Signup from './components/signup.vue'
import Logos from './components/logos.vue'
import { mapState } from 'vuex'
import Notifications from 'vue-notification'

Vue.use(Notifications)

new Vue({
  el: '#brand-logos',
  store,
  data() {
    return {
      page (state) {
        if (state.owner) return Admins
        if (state.admin) return Brands
        if (state.brand) return Products
        if (state.client) return Logos
        return Signup
      }
    }
  },
  computed: mapState({
    ViewComponent(state) {
      return this.page(state)
    }
  }),
  created() {
    this.$store.dispatch('initApp')
  },
  render(h) {
    return h(this.ViewComponent)
  }
})