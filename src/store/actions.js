import Vue from 'vue'
import api from '../api'

export default {
  initApp ({ commit, state, dispatch }) {
    api.getContract()
    .then(function () {
      return api.getUser()
    })
    .then(function (data) {
      commit('setCoinbase', data)

      return api.isOwner()
    })
    .then(function (owner) {
      commit('setOwner', owner === state.coinbase)
      
      return api.isAdmin(state.coinbase)
    })
    .then(function (data) {
      commit('setAdmin', data)

      return api.getBrand(state.coinbase)
    })
    .then(function (data) {
      commit('setBrand', data)

      return api.getClient(state.coinbase)
    })
    .then(function (data) {
      commit('setClient', data)

      dispatch('watchEvents', false)
    })
    .catch(function (err) {
      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  },
  watchEvents ({ commit, state }) {
    const events = api.getEvents()

    events.watch(function (err, log) {
      if (err) return Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
      
      switch (log.event) {
        case 'AdminSet':
          if (state.owner) {
            return commit('pushToAdmins', log.args.admin)
          }
          return
        case 'BrandSet':
          if (state.admin || state.client) {
            return commit('pushToBrands', {
              name: log.args.name,
              address: log.args.brand
            })
          }
          return
        case 'ProductAdded':
          if (state.brand && log.args.brand === state.coinbase) {
            return commit('pushToProducts', {
              name: log.args.name,
              fileHash: log.args.fileHash,
              price: log.args.price,
              priceEth: web3.utils.fromWei(log.args.price.toString(), 'ether'),
              owner: log.args.owner
            })
          }

          if (state.client) {
            const brand = state.brands.find(function (br) {
              return br.address === log.args.brand
            })

            return commit('pushToProducts', {
              name: log.args.name,
              fileHash: log.args.fileHash,
              price: log.args.price,
              priceEth: web3.utils.fromWei(log.args.price.toString(), 'ether'),
              owner: log.args.owner,
              brand
            })
          }

          return
        case 'ClientSet':
          if (log.args.client === state.coinbase && !state.client) {
            commit('setClient', log.args.name)

            location.reload()
          }
          return
        case 'Bought':
          if (state.client || state.brand) {
            return commit('setBought', {
              fileHash: log.args.fileHash,
              owner: log.args.client
            })
          }
          return
        default:
          return
      }
    })
  },
  addAdmin ({ state }, address) {
    api.setAdmin(address, state.coinbase)
    .then(function (res) {
      Vue.notify({
        group: 'foo',
        title: 'Transaction Sent',
        text: `TX Hash ${res.tx}`,
        type: 'success'
      })
    })
    .catch(function (err) {
      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  },
  addBrand ({ state }, brand) {
    
    api.setBrand(brand, state.coinbase)
    .then(function (res) {
      Vue.notify({
        group: 'foo',
        title: 'Transaction Sent',
        text: `TX Hash ${res.tx}`,
        type: 'success'
      })
    })
    .catch(function (err) {
      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  },
  uploadImage ({ commit }, reader) {
    const buffer = Buffer.from(reader.result)
    
    commit('setUploadStatus' , 'loading')

    api.uploadImage(buffer)
    .then(function (res) {
      commit('setUploadStatus' , 'finished')
      commit('setFileHash', res[0].hash)
    })
    .catch(function (err) {
      commit('setUploadStatus' , 'error')

      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  },
  addProduct ({ state }, product) {
    
    api.addProduct(product, state.coinbase)
    .then(function (res) {
      Vue.notify({
        group: 'foo',
        title: 'Transaction Sent',
        text: `TX Hash ${res.tx}`,
        type: 'success'
      })
    })
    .catch(function (err) {
      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  },
  signup ({ state }, name) {
    api.signup(name, state.coinbase)
    .then(function (res) {
      Vue.notify({
        group: 'foo',
        title: 'Transaction Sent',
        text: `TX Hash ${res.tx}`,
        type: 'success'
      })
    })
    .catch(function (err) {
      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  },
  buy ({ state }, product) {
    api.buy(product, state.coinbase)
    .then(function (res) {
      Vue.notify({
        group: 'foo',
        title: 'Transaction Sent',
        text: `TX Hash ${res.tx}`,
        type: 'success'
      })
    })
    .catch(function (err) {
      Vue.notify({
        group: 'foo',
        title: 'Error',
        text: err.message,
        type: 'error'
      })
    })
  }
}