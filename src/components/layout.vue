<template>
  <div>
    <notifications group="foo" />

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Brand Logos
          <span v-if="owner">&nbsp;- Owner</span>
          <span v-if="admin">&nbsp;- Admin</span>
          <span v-if="brand">&nbsp;- Brand</span>
          <span v-if="client">&nbsp;- Client</span>
          <span v-if="brand">&nbsp;- {{brand}}</span>
          <span v-if="client">&nbsp;- {{client}}</span>
        </a>
      </div>
    </nav>

    <slot></slot>
  </div>
</template>


<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'

  export default Vue.component('layout', {
    computed: mapState([
      'owner',
      'admin',
      'brand',
      'client'
    ])
  })
</script>

<style lang="scss" scoped>
  .navbar {
    margin-bottom: 50px;
  }
</style>