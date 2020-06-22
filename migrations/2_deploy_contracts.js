var Storage = artifacts.require("./contracts/Storage.sol");


module.exports = function(deployer) {
  deployer.deploy(Storage);
};
