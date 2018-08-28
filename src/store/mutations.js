export default {
  setOwner(state, data) {
    state.owner = data
  },
  setAdmin(state, data) {
    state.admin = data
  },
  setBrand(state, data) {
    state.brand = data
  },
  setClient(state, data) {
    state.client = data
  },
  setCoinbase(state, data) {
    state.coinbase = data
  },
  pushToAdmins (state, admin) {
    state.admins.push(admin)
  },
  pushToBrands (state, brand) {
    state.brands.push(brand)
  },
  setUploadStatus(state, status) {
    state.uploadStatus = status
  },
  setFileHash(state, hash) {
    state.fileHash = hash
  },
  pushToProducts(state, product) {
    state.products.push(product)
  },
  setBought(state, data) {
    let product = state.products.find(function (pr) {
      return pr.fileHash === data.fileHash
    })

    product.owner = data.owner
  }
}