pragma solidity ^0.4.24;

import './ProductLib.sol';

contract BrandLogos {
  using ProductLib for ProductLib.Product;

  function () public {
    revert();
  }

  bool public stopped = false;
  address public owner;
  mapping (address => bool) admins;
  mapping (address => string) clients;
  mapping (address => string) brands;
  mapping (string => ProductLib.Product) products;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyLive {
    require(!stopped);
    _;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  modifier onlyAdmin {
    require(admins[msg.sender]);
    _;
  }

  modifier onlyClient {
    require(bytes(clients[msg.sender]).length > 0);
    _;
  }

  modifier onlyBrand {
    require(bytes(brands[msg.sender]).length > 0);
    _;
  }

  function setOwner(address _owner) public onlyLive onlyOwner {
    owner = _owner;
    emit OwnerSet(owner);
  }

  function setAdmin(address admin) public onlyLive onlyOwner {
    require(!admins[admin]);

    admins[admin] = true;
    emit AdminSet(admin);
  }

  function unsetAdmin(address admin) public onlyLive onlyOwner {
    admins[admin] = false;
    emit AdminUnset(admin);
  }

  function isAdmin(address admin) public constant returns (bool) {
      return admins[admin];
  }

  function getClient(address client) public constant returns (string) {
      return clients[client];
  }

  function getBrand(address brand) public constant returns (string) {
      return brands[brand];
  }

  function getProduct(string fileHash) public constant returns (string name, address _owner) {
      name = products[fileHash].name;
      _owner = products[fileHash].owner;
  }

  function buy(string fileHash) public payable onlyLive onlyClient {
    require(ProductLib.buy(products[fileHash]));
    
    emit Bought(msg.sender, fileHash);
  }

  function withdraw(uint256 sum) public onlyLive onlyOwner {
    require(sum > 0 && sum <= address(this).balance);

    msg.sender.transfer(sum);
    emit Withdrawn(msg.sender, sum);
  }

  function setClient(address client, string name) public onlyLive {
    clients[client] = name;
    emit ClientSet(client, name);
  }

  function setBrand(address brand, string name) public onlyLive onlyAdmin {
    brands[brand] = name;
    emit BrandSet(brand, name);
  }

  function unsetBrand(address brand) public onlyLive onlyAdmin {
    brands[brand] = '';
    emit BrandUnset(brand);
  }

  function addProduct(string name, string fileHash, uint256 price) public onlyLive onlyBrand {
    require(products[fileHash].price == 0);

    products[fileHash] = ProductLib.Product(name, price, msg.sender, 0x0);
    emit ProductAdded(msg.sender, name, price, fileHash);
  }

  function kill() public onlyOwner {
    selfdestruct(owner);
  }

  function stop() public onlyOwner {
    stopped = true;
  }

  function resume() public onlyOwner {
    stopped = false;
  }

  event OwnerSet(address indexed owner);
  event AdminSet(address indexed admin);
  event AdminUnset(address indexed admin);
  event ClientSet(address indexed client, string name);
  event ClientUnset(address indexed client);
  event BrandSet(address indexed brand, string name);
  event BrandUnset(address indexed brand);
  event Bought(address indexed client, string fileHash);
  event Withdrawn(address indexed owner, uint256 value);
  event ProductAdded(address indexed brand, string name, uint256 price, string fileHash);
}
