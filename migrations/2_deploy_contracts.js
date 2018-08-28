/* eslint-env node */
/* global artifacts */

const BrandLogos = artifacts.require("./BrandLogos.sol")
const ProductLib = artifacts.require("./ProductLib.sol")

module.exports = function(deployer) {
  deployer.deploy(ProductLib)
  deployer.link(ProductLib, BrandLogos)
  deployer.deploy(BrandLogos)
}