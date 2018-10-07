var Migrations = artifacts.require('./Migrations.sol');
var EthTip = artifacts.require('./EthTip.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(EthTip);
};
