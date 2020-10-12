const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./chaiSetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async function (accounts) {
  const [initialHolder, recipient, anotherAccount] = accounts;

  it("there shouldnt be any coins in my account", async () => {
    let instance = await Token.deployed();
    return expect(instance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("all the tokens should be in tokenSale contract", async() => {
    let instance = await Token.deployed();
    const tokenSaleBalance = await instance.balanceOf.call(TokenSale.address);
    const allTokens = await instance.totalSupply();
    return expect(allTokens).to.be.a.bignumber.equal(new BN(tokenSaleBalance));
  });

  it("should be able to buy a token by simply adding balance to the smart contract", async() => {
      let instance = await Token.deployed();
      let tokenSaleInstance = await TokenSale.deployed();
      let balanceBeforeTransfer = await instance.balanceOf.call(recipient);

      let kycInstance = await KycContract.deployed();
      await kycInstance.setKyc(recipient,  {from: initialHolder});
      expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("10","wei")})).to.be.fulfilled;
      // let balanceAfterTransfer = await instance.balanceOf(recipient);
      balanceBeforeTransfer = balanceBeforeTransfer.add(new BN(10));
      return expect(instance.balanceOf(recipient)).to.eventually.be.bignumber.equal(balanceBeforeTransfer);
  });

});

