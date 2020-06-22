const contract = require('truffle-contract');
var _ = require('lodash');
const ethers = require('ethers');
const storage = require('../build/contracts/Storage.json');
var Storage = contract(storage);

App = {

  set: function(hash) {
    var self = this;
    var storageInstance;
    //console.log(account);

    Storage.setProvider(self.web3.currentProvider);
    //console.log('the account ' + account);

    return new Promise(function(resolve, reject) {

      Storage.deployed().then((instance) => {
      //console.log(instance);
      storageInstance = instance;
      //console.log(iovInstance.vehicleCount());
      return storageInstance.set(hash, { from: self.web3.eth.accounts[0] });
    }).then((result) => {
      //console.log(result);
      resolve(result);
    }).catch((err) => {
      reject(err.message);
    })
  });
  },

  get: function() {
    var self = this;
    var storageInstance;
    //console.log(account);

    Storage.setProvider(self.web3.currentProvider);
    //console.log('the account ' + account);

    return new Promise(function(resolve, reject) {

      Storage.deployed().then((instance) => {
      //console.log(instance);
      storageInstance = instance;
      //console.log(iovInstance.vehicleCount());
      return storageInstance.get();
    }).then((result) => {
      //console.log(result);
      resolve(result);
    }).catch((err) => {
      reject(err.message);
    })
  });
  },

  renderAdmin: function() {
    var self = this;
    Storage.setProvider(self.web3.currentProvider);

    // Load account data
    return new Promise(function(resolve, reject) {
      resolve(self.web3.eth.accounts[0]);
    });
  },

 /* renderAccount: function(index) {
    var self = this;
    var iovInstance;
    //console.log(account);

    Iov.setProvider(self.web3.currentProvider);
    //console.log('the account ' + account);

    return new Promise(function(resolve, reject) {

    Iov.deployed().then((instance) => {
      //console.log(instance);
      iovInstance = instance;
      //console.log(iovInstance.vehicleCount());
      return iovInstance.vehicleArray(index);
    }).then((result) => {
      //console.log(result);
      resolve(result);
    }).catch((err) => {
      reject(err.message);
    })
  });
  } */
}



module.exports = App;