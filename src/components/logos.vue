<template>
  <layout>
    <div class="card-list">
      <div class="card" v-for="product in products" :key="product.fileHash">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="`https://ipfs.io/ipfs/${product.fileHash}`">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <div>
                <p class="title is-4">{{product.name}}</p>
                <p class="subtitle is-6">by {{product.brand.name}}</p>
              </div>
              
              <button class="button is-link" @click="buy(product)" v-if="!product.owner">
                {{product.priceEth}} ETH
              </button>
              <button class="button is-light" v-if="product.owner">
                <span v-if="product.owner === coinbase">Owned</span>
                <span v-if="product.owner !== coinbase">Sold</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </layout>
</template>

<script>
  import Vue from 'vue'
  import './layout.vue'
  import { mapState, mapActions } from 'vuex'

  export default Vue.component('logos', {
    data () {
      return {
        formShown: false
      }
    },
    methods: mapActions([
      'buy'
    ]),
    computed: mapState([
      'products',
      'coinbase'
    ])
  })
</script>


<style lang="scss" scoped>
  .card-list {
    display: flex;
    justify-content: space-around;
    width: 700px;
    margin: auto;
  }

  .card {
    width: 300px;
  }

  .media-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
