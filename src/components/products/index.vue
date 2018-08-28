<template>
  <layout>
    <newProductForm v-if="formShown" @close="toggleForm()" />

    <nav class="panel">
      <p class="panel-heading">
        Products

        <button class="button is-link" @click="toggleForm()" v-if="!formShown">
          Add New Product
        </button>
      </p>

      <div class="panel-block" v-for="(product, index) in products" :key="index">
        <img :src="`https://ipfs.io/ipfs/${product.fileHash}`" class="logo" />
        <span>{{product.name}}</span>
        <span>{{product.priceEth}} ETH</span>
      </div>
    </nav>
  </layout>
</template>

<script>
  import Vue from 'vue'
  import '../layout.vue'
  import './newProductForm.vue'
  import { mapState } from 'vuex'

  export default Vue.component('products', {
    data () {
      return {
        formShown: false
      }
    },
    methods: {
      toggleForm () {
        this.formShown = !this.formShown
      }
    },
    computed: mapState({
      products: 'products'
    })
  })
</script>


<style lang="scss" scoped>
  .panel {
    margin: 50px auto;
    width: 700px;
  }

  .panel-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    height: 50px;
  }
</style>
