<template>
  <layout>
    <newBrandForm v-if="formShown" @close="toggleForm()" />

    <nav class="panel">
      <p class="panel-heading">
        Brands

        <button class="button is-link" @click="toggleForm()" v-if="!formShown">
          Add New Brand
        </button>
      </p>

      <div class="panel-block" v-for="(brand, index) in brands" :key="index">
        <span>{{brand.name}}</span>
        <span>{{brand.address}}</span>
      </div>
    </nav>
  </layout>
</template>

<script>
  import Vue from 'vue'
  import '../layout.vue'
  import './newBrandForm.vue'
  import { mapState } from 'vuex'

  export default Vue.component('brands', {
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
      brands: 'brands'
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
</style>
