var MyToken = artifacts.require('./MyToken.sol');
var MyTokenSale = artifacts.require('./MyTokenSale.sol');
require('dotenv').config({path: '../.env'});
var KycContract = artifacts.require("./KycContract.sol");

module.exports = async function(deployer) {
    const accounts = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSale, 1, accounts[0], MyToken.address, KycContract.address);
    const instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
}