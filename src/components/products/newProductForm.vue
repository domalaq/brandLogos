<template>
  <div class="container">

    <div class="box">
      <p>Create New Logo Product</p>
      <br>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Logo Image</label>
        </div>
        <div class="field-body">
          <div class="file has-name is-fullwidth">
            <label class="file-label">
              <input class="file-input" type="file" @change="captureFile($event.target.files)" accept="image/*" :disabled="uploadStatus === 'loading'">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name">
                {{uploadStatus}}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="name">
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Price (ETH)</label>
        </div>
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="number" v-model="priceEth">
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
              <button class="button is-link" @click="addProduct({ name, priceEth, fileHash });$emit('close')" :disabled="uploadStatus !== 'finished'">
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
  import { mapActions, mapState } from 'vuex'

  export default Vue.component('newProductForm', {
    data: function () {
      return {
        name: '',
        address: '',
        priceEth: 0
      }
    },
    methods: {
      captureFile (files) {
        const file = files[0]
        let reader = new window.FileReader()
        reader.onloadend = () => this.uploadImage(reader)
        reader.readAsArrayBuffer(file)
      },
      ...mapActions([
        'addProduct',
        'uploadImage'
      ])
    },
    computed: mapState([
      'uploadStatus',
      'fileHash'
    ])
  })
</script>


<style lang="scss" scoped>
  .container {
    width: 700px;
  }
</style>
