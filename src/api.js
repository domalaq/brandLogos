import artifact from '../build/contracts/BrandLogos.json'
import TruffleContract from 'truffle-contract'
import Web3 from 'web3'
import Ipfs from 'ipfs-api'

const web3Provider = typeof web3 !== 'undefined' ? web3.currentProvider : new Web3(new web3.providers.HttpProvider('http://127.0.0.1:8545'))
web3 = new Web3(web3Provider)

const Contract = TruffleContract(artifact)
Contract.setProvider(web3Provider)
let contract

const ipfs = Ipfs({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
  'api-path': '/api/v0/'
})

export default {
  getContract () {
    return new Promise(function (resolve, reject) {
      Contract.deployed()
      .then(function (data) {
        contract = data

        resolve()
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  getUser () {
    return new Promise(function (resolve, reject) {
      web3.eth.getCoinbase()
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  isOwner () {
    return new Promise(function (resolve, reject) {
      contract.owner.call()
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  isAdmin (coinbase) {
    return new Promise(function (resolve, reject) {
      contract.isAdmin.call(coinbase)
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  getBrand (coinbase) {
    return new Promise(function (resolve, reject) {
      contract.getBrand.call(coinbase)
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  getClient (coinbase) {
    return new Promise(function (resolve, reject) {
      contract.getClient.call(coinbase)
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  getEvents () {
    return contract.allEvents({fromBlock: 0, toBlock: 'latest'})
  },
  setAdmin (address, coinbase) {
    return new Promise(function (resolve, reject) {
      contract.setAdmin(address, {from: coinbase})
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  setBrand (brand, coinbase) {
    return new Promise(function (resolve, reject) {
      contract.setBrand(brand.address, brand.name, {from: coinbase})
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  uploadImage (buffer) {
    return new Promise(function (resolve, reject) {
      ipfs.files.add(buffer)
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  addProduct (product, coinbase) {
    return new Promise(function (resolve, reject) {
      contract.addProduct(product.name, product.fileHash, web3.utils.toWei(product.priceEth, 'ether'), {
        from: coinbase,
        gas: 200000
      })
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  signup (name, coinbase) {
    return new Promise(function (resolve, reject) {
      contract.setClient(coinbase, name, {
        from: coinbase
      })
      .then(function (data) {
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  buy (product, coinbase) {
    return new Promise(function (resolve, reject) {
      contract.buy(product.fileHash, {
        from: coinbase,
        value: product.price
      })
      .then(function (data) {
        console.log(data);
        
        resolve(data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  }
}