<template>
  <layout>
    <newAdminForm v-if="formShown" @close="toggleForm()" />

    <nav class="panel">
      <p class="panel-heading">
        Admins

        <button class="button is-link" @click="toggleForm()" v-if="!formShown">
          Add New Admin
        </button>
      </p>

      <div class="panel-block" v-for="(admin, index) in admins" :key="index">
        {{admin}}
      </div>
    </nav>
  </layout>
</template>

<script>
  import Vue from 'vue'
  import '../layout.vue'
  import './newAdminForm.vue'
  import { mapState } from 'vuex'

  export default Vue.component('admins', {
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
      admins: 'admins'
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
</style>
