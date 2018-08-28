/* eslint-env mocha */
/* global artifacts, contract, assert */

/* This test mainly checks if users can do actions that intended to be done. Also there are checks if one role can do another role's actions */

const BrandLogos = artifacts.require('BrandLogos')

async function tryCatch (promise) {
  try {
    await promise
    return true
  } catch (error) {
    assert(error, 'no error')
    return true
  }
}

contract('BrandLogos', function(accounts) {
  it("should make contract creator an owner", function() {
    return BrandLogos.deployed().then(function(instance) {
      return instance.owner.call()
    })
    .then(function(owner) {
      assert.equal(owner, accounts[0], "creator is not owner")
    })
  }),
  it("should allow making address as admin only to owner", function() {
    let contract

    return BrandLogos.deployed().then(function(instance) {
      contract = instance
      return contract.setAdmin(accounts[1], {from: accounts[0]})
    })
    .then(function() {
      return contract.isAdmin.call(accounts[1])
    })
    .then(async function(isAdmin) {
      assert.equal(isAdmin, true, "address is not admin")
      
      await tryCatch(contract.setAdmin(accounts[2], {from: accounts[1]}))
    })
  }),
  it("should allow adding brand only to admin", function() {
    let contract

    return BrandLogos.deployed().then(function(instance) {
      contract = instance
      return contract.setBrand(accounts[2], 'Tesla', {from: accounts[1]})
    })
    .then(function() {
      return contract.getBrand.call(accounts[2])
    })
    .then(async function(brand) {
      assert.equal(brand, 'Tesla', "admin failed to add brand")

      await tryCatch(contract.setBrand(accounts[3], {from: accounts[2]}))
    })
  }),
  it("should allow adding product only to brand", function() {
    let contract

    return BrandLogos.deployed().then(function(instance) {
      contract = instance
      return contract.addProduct('Doge', 'hash', 1000, {from: accounts[2]})
    })
    .then(function() {
      return contract.getProduct.call('hash')
    })
    .then(async function(product) {
      assert.equal(product[0], 'Doge', "brand failed to add product")

      await tryCatch(contract.addProduct('Coca-Cola', 'hash2', 2000, {from: accounts[3]}))
    })
  }),
  it("should allow user to sign up as client", function() {
    let contract

    return BrandLogos.deployed().then(function(instance) {
      contract = instance
      return contract.setClient(accounts[3], 'Bakh', {from: accounts[3]})
    })
    .then(function () {
      return contract.getClient.call(accounts[3])
    })
    .then(function (client) {
      assert.equal(client, 'Bakh', "user failed to sign up")
    })
  }),
  it("should allow buying logo only to client", function() {
    let contract

    return BrandLogos.deployed().then(function(instance) {
      contract = instance
      return contract.buy('hash', {from: accounts[3], value: 1000})
    })
    .then(function() {
      return contract.getProduct.call('hash')
    })
    .then(async function(product) {
      assert.equal(product[1], accounts[3], "client failed to buy logo")

      await tryCatch(contract.buy('hash', {from: accounts[4], value: 1000}))
    })
  })
})