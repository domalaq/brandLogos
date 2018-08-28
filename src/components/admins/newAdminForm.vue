<template>
  <div class="container">

    <div class="box">
      <p>Enter New Admin ETH Address</p>
      <br>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Address</label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="address">
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal" style="margin-top:30px">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button class="button is-link" @click="addAdmin(address);$emit('close')">
                Add
              </button>
              <button class="button is-white" @click="$emit('close')">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'

  export default Vue.component('newAdminForm', {
    data: function () {
      return {
        address: ''
      }
    },
    methods: {
      ...mapActions([
        'addAdmin'
      ])
    },
    computed: {
      
    }
  })
</script>


<style lang="scss" scoped>
  .container {
    width: 700px;
  }
</style>
