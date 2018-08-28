pragma solidity ^0.4.24;

library ProductLib {
  struct Product {
    string name;
    uint256 price;
    address brand;
    address owner;
  }

  function buy (Product storage self) public returns (bool) {
    if (msg.value >= self.price) {
      self.owner = msg.sender;
      return true;
    }
    
    return false;
  }
}
