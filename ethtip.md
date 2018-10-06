ethtip

users want to be able to transact monetary value in a low friction environment
given the prevalence of social media, we've decided that twitter would be the optimal platform to create a POC for such a product

database
keep track of every tip

```ts
interface Tip {
    amount: string // wei 
    destination: string // twitter username || eth address 
    sender: string // twitter username || eth address 
    date: string // when the tip was sent 
    ipfsHash: string
    tweetId?: string // id_str field, optional. Only generated if tip originates from twitter
}
```

1. User goes to ethtip.io (how to get funds on your account initially w/o being tipped)
    - input amount
    - input dest (only a twitter handle)
2. User gets twipped (public or dm)
    -  existing twitter user tips by sending "@ethtip 0.1 ETH to @dternyak"
    -  service responds with failure or success case
3. User wants to get balance 
    - dm bot



