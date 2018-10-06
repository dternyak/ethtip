ethtip

Users want to be able to transact monetary value in a low friction environment
given the prevalence of social media, we've decided that twitter would be the optimal platform to create a POC for such a product

```ts
interface Tip {
  amount: string; // wei
  destination: string; // twitter username || eth address
  sender: string; // twitter username || eth address
  date: string; // when the tip was sent
  ipfsHash: string;
  tweetId?: string; // id_str field, optional. Only generated if tip originates from twitter
}
```

1. User goes to ethtip.io (how to get funds on your account initially w/o being tipped)
   - input amount
   - input dest (only a twitter handle)
2. User gets twipped (public or dm)
   - existing twitter user tips by sending "@ethtip 0.1 ETH to @dternyak"
   - service responds with failure or success case
3. User wants to get balance
   - dm bot

## Smart contract

The smart contract is responsible for:

- holding the pooled ether of all tippers
- accounting for all tippers individual balances
- providing tranfer ability between users
- providing withdrawal ability to an address
- providing deposit ability from an address

```solidity
interface EthTip {
    /// @param to deposit ether to contract, format is keccak256(twitterUser).slice(0,20)
    function deposit(address to) public payable;

    /// @desc CL Callback, transfer ether out of the contract
    /// @param from msg.sender or keccak256(twitterUser).slice(0,20)
    /// @param to ethereum address to withdraw to
    /// @param amount amount to send
    function fufillTransferExternal(bytes32 _requestId, address from, address to, uint amount) public;

    /// @desc CL Callback, transfer ether within the contract from twitter user to twitter user
    /// @param from keccak256(twitterUser).slice(0,20)
    /// @param to keccak256(twitterUser).slice(0,20)
    /// @param amount amount to send
    functoin fufillTransferInternal(bytes32 _requestId, address from, address to, uint amount);

    /// @desc return the total supply of the contract
    function totalSupply() public view returns (uint);

}
```

## Twitter Commands

### DM

```
send <value>ETH to <destination OR @username>
balance
help
```

### Public

```
@ethtip send <value>ETH to <destination OR @username>
help
```

## External Adapter

The external adapter watches for any mentions to its name "@ethtip" or DMs and performs the following actions:

1. Parse the message and extract the interface of

```ts
enum TRANSFER_TYPE {
  EXTERNAL = "EXTERNAL",
  INTERNAL = "INTERNAL"
}

interface ExtractedTweet {
  tranferType: TRANSFER_TYPE;
  amount: string; // wei
  destination: string; //twitter username || eth address
  sender: string; // twitter username || eth address
  date: string; // when tip was sent
}
```

2. Call either `fufillTransferInternal` or `fufillTransferExternal` depending on the transfer type

## Website

Facilitates the onboarding of a user to allow them to deposit ether to the smart contract, which is mapped to their twitter username.

Also displays gamification information, such as largest transfer, # of transfers, etc.
