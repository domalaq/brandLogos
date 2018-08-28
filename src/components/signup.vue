<template>
  <layout>
      <div class="container">
        <div class="box order-form">
          <p>Please Sign Up.</p>
          <br>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Name</label>
            </div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="field">
                  <p class="control is-expanded">
                    <input class="input" type="text" v-model="name">
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal" style="margin-top:30px">
            <div class="field-label">
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-link" @click="signup(name)">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </layout>
</template>

<script>
  import './layout.vue'
  import { mapActions } from 'vuex'

  export default {
    data: function () {
      return {
        name: ''
      }
    },
    methods: mapActions([
      'signup'
    ]),
    computed: {
    }
  }
</script>


<style lang="scss" scoped>
  .container {
    width: 700px;
  }
</style>
