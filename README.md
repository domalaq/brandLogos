Brand Logos is a marketplace on Ethereum and IPFS where user can buy different logos provided by brands.
Owners of logos will have some benefits from these companies like discounts, free service, gifts and so on.

# Installation
Truffle should be installed globally.
On project root folder run:
```
npm install
```

Also run Ganache:
```
ganache-cli
```

Compile and migrate contracts with Truffle:
```
truffle compile
truffle migrate
```

Launch dApp on browser:
```
npm run dev
```

Also set Metamask to Local Network and create new wallet using mnemonic from Ganache.

# User Stories
Owner opens web app. He sees a page for adding Admins to this app. He must provide future admin's address to gave it admin role.

Admins can add Brands. They must provide name and address of a brand.

Brand can add logo Products to app. First they upload logo image to IPFS and then provide Name and Price of this logo.

User can signup and become a Client see and buy Logos then. To signup user must provide his name. After signing up Client sees list of Logos. He can purchase a logo and see that it is owned by him. Another Clients see owned logos as Sold and can't buy them.
