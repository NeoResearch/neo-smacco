# neo-smacco
SMACCO - SMart ACcount COmposer

This project aims to easily generate "smart accounts" for holding assets based on different (and combined) features:
- public/private key validation
- MultiSig
- timelock
- Asset-specific behavior (only allowing withdraws for specific assets, for example)

That will help NEO users to easily create and manage safe account addresses. Initially, only json interface will be provided to allow C# code generation (that will become AVM). After that, visual interfaces can help the design process, keeping in mind this is NOT a tool intended for developers, but to general public.

## How to use it

### Install on web browser

```html
<script src="https://unpkg.com/neo-smacco/dist/bundle.js"></script>
```

```js
Smacco = smacco.Smacco;
```

### Install on npm

`npm install neo-smacco`

```js
const Smacco = require('neo-smacco').Smacco;
```

## For Developers

### Tests

`npm test`

### Build Webpack

`npm run build`

### New minor version

`npm version minor`

### Push and Publish

`git push origin master --tags`

`npm publish`

## Examples

### Checking Simple Signature

```json
{
  "standard": "smacco-1.0",
  "input_type" : "single",
  "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
  "rule" : {
    "rule_type": "ALLOW_IF",
    "condition" : {
      "condition_type" : "CHECKSIG"
    }
  }
}

```

### Checking Multiple Signatures (2/3 multisig)

```json
{
 "standard": "smacco-1.0",
 "input_type" : "array",
 "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
   "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
 "rule" : {
   "rule_type": "ALLOW_IF",
   "condition" : {
     "condition_type" : "CHECKMULTISIG",
     "minimum_required" : "2"
   },
 }
}
```

### Time Locking funds (until timestamp 1536896190)

```json
{
  "standard": "smacco-1.0",
  "input_type" : "single",
  "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
  "rules" : [
    {
      "rule_type": "DENY_IF",
      "condition" : {
        "condition_type" : "TIMESTAMP_LESS",
        "timestamp" : "1536896190",
      },
    },
    {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKSIG"
      },
    },
  ]
}
```

### Complex logic -- Charity Donations Template

This example is inspired by a conversation with @lerider and @vncoelho (https://github.com/neo-project/proposals/issues/53), the idea is to
demonstrate the capability of easily handling different logic for different assets (Neo/Gas/...).

```json
{
  "standard": "smacco-1.0",
  "input_type" : "single",
  "pubkey_list" : ["031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a", "036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
  "rules" : [
    {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKSIG",
        "pubkey" : "0"
      },
    },
    {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "AND",
        "conditions" : [
          {
            "condition_type" : "CHECKSIG",
            "pubkey" : "1"
          },
          {
            "condition_type" : "OR",
            "conditions" : [
              {
                "condition_type" : "AND",
                "conditions" : [
                  {
                    "condition_type" : "SELF_TRANSFER"
                  },
                  {
                    "condition_type" : "ONLY_NEO"
                  }
                ]
              },
              {
                "condition_type" : "ONLY_GAS"
              }
            ]
          },
        ]
      },
    },
  ],
  "default_rule" : "DENY_ALL"
}
```


## License

Copyleft 2018  

MIT license
