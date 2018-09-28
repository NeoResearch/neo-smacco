const Smacco = require('./smacco').Smacco;

test('Smacco() Single ALLOW_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "inline_last" : "disabled",
    "default_rule" : "ALLOW_ALL"
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static bool Main(byte[] signature){\n\
return true;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() Single DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "inline_last" : "disabled",
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static bool Main(byte[] signature){\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() Array ALLOW_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "default_rule" : "ALLOW_ALL"
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static bool Main(byte[][] signatures){\n\
return true;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() Array DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static bool Main(byte[][] signatures){\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});

test('Smacco() Array PK1 DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[][] signatures){\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});

test('Smacco() Array PK3 DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
    "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool Main(byte[][] signatures){\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});

test('Smacco() Array PK3 CHECKMULTISIG 2/2 DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
    "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "rules" : [
      {
          "rule_type": "ALLOW_IF",
          "condition" : {
            "condition_type" : "CHECKMULTISIG",
            "condition_name" : "CheckMultiSig2_2",
            "pubkeys"  : [
                "0",
                "1",
              ],
            "signatures" : [
              "0",
              "1",
              ]
          },
      }
    ],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig2_2(byte[][] signatures){\n\
byte[][] vpub = new[] {pubkey_0, pubkey_1};\n\
byte[][] vsig = new[] {signatures[0], signatures[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
if(CheckMultiSig2_2(signatures))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});

test('Smacco() Array PK3 CHECKMULTISIG 2/3 DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
    "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "rules" : [
      {
          "rule_type": "ALLOW_IF",
          "condition" : {
            "condition_type" : "CHECKMULTISIG",
            "condition_name" : "CheckMultiSig2_3",
            "pubkeys"  : [
                "0",
                "1",
                "2",
              ],
            "signatures" : [
              "0",
              "1",
              ]
          },
      }
    ],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig2_3(byte[][] signatures){\n\
byte[][] vpub = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
byte[][] vsig = new[] {signatures[0], signatures[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
if(CheckMultiSig2_3(signatures))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() Compact Array PK3 CHECKMULTISIG 2/3 DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "array",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
      "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKMULTISIG",
        "minimum_required" : "2"
      },
    },
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig2_3(byte[][] signatures){\n\
byte[][] vpub = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
byte[][] vsig = new[] {signatures[0], signatures[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
if(CheckMultiSig2_3(signatures))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
/*
51c56b6c766b00527ac46c766b00c36165100064080051616c756600616c
756652c56b6c766b00527ac453c5760061 21036245f426b4522e8a2901be
6ccc1f71e37dc376726cc6665d80c5997e240568fbc47651612103038973
94935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0dc4
7652612102e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d63
13625a930874b4c46c766b51527ac452c576006c766b00c300c3c476516c
766b00c351c3c46c766b51c3ae616c7566
*/
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() Single CHECKSIG 0 DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKSIG",
        "pubkey"  : "0"
      },
    },
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
if(VerifySignature(signature, pubkey_0))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() Compact Single CHECKSIG DENY_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "inline_last" : "disabled",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKSIG"
      },
    },
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
if(VerifySignature(signature, pubkey_0))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline Single CHECKSIG', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKSIG",
        "pubkey"  : "0"
      }
    }
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
return (VerifySignature(signature, pubkey_0));\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});

test('Smacco() inline Single CHECKSIG AND CHECKSIG', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb", "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type": "AND",
        "conditions" : [
          {
            "condition_type" : "CHECKSIG",
            "pubkey"  : "0"
          },
          {
            "condition_type" : "CHECKSIG",
            "pubkey"  : "1"
          }
        ]
      }
    }
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
return ((VerifySignature(signature, pubkey_0)) && (VerifySignature(signature, pubkey_1)));\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline Single CHECKSIG OR CHECKSIG', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb", "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type": "OR",
        "conditions" : [
          {
            "condition_type" : "CHECKSIG",
            "pubkey"  : "0"
          },
          {
            "condition_type" : "CHECKSIG",
            "pubkey"  : "1"
          }
        ]
      }
    }
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
return ((VerifySignature(signature, pubkey_0)) || (VerifySignature(signature, pubkey_1)));\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});



test('Smacco() inline Compact Array PK3 CHECKMULTISIG 2/3 DENY_ALL', () => {
  var config = {
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

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig2_3(byte[][] signatures){\n\
byte[][] vpub = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
byte[][] vsig = new[] {signatures[0], signatures[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
return (CheckMultiSig2_3(signatures));\n\
}\n\
}\n\
}\n\
";
/*
51c56b6c766b00527ac46c766b00c361650700616c756652c56b6c766b00
527ac453c576006121036245f426b4522e8a2901be6ccc1f71e37dc37672
6cc6665d80c5997e240568fbc4765161210303897394935bb5418b1c1c4c
f35513e276c6bd313ddd1330f113ec3dc34fbd0dc47652612102e2baf21e
36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4c46c
766b51527ac452c576006c766b00c300c3c476516c766b00c351c3c46c76
6b51c3ae616c7566
*/
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline Single TIMESTAMP_LESS CHECKSIG', () => {
  var config = {
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

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
if(Blockchain.GetHeader(Blockchain.GetHeight()).Timestamp < 1536896190)\n\
return false;\n\
return (VerifySignature(signature, pubkey_0));\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline Single TIMESTAMP_GREATER CHECKSIG', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rules" : [
      {
        "rule_type": "DENY_IF",
        "condition" : {
          "condition_type" : "TIMESTAMP_GREATER",
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

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[] signature){\n\
if(Blockchain.GetHeader(Blockchain.GetHeight()).Timestamp > 1536896190)\n\
return false;\n\
return (VerifySignature(signature, pubkey_0));\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline single SELF_TRANSFER', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rules" : [
      {
        "rule_type": "DENY_IF",
        "condition" : {
          "condition_type" : "SELF_TRANSFER"
        },
      },
    ]
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool SelfTransfer(){\n\
Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;\n\
TransactionOutput[] outputs = tx.GetOutputs();\n\
foreach (TransactionOutput output in outputs)\n\
if (output.ScriptHash != ExecutionEngine.ExecutingScriptHash)\n\
return false;\n\
return true;\n\
}\n\
public static bool Main(byte[] signature){\n\
return (SelfTransfer());\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline single ONLY_NEO', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rules" : [
      {
        "rule_type": "ALLOW_IF",
        "condition" : {
          "condition_type" : "ONLY_NEO"
        },
      },
    ]
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
private static readonly byte[] NeoAssetId = { 155, 124, 255, 218, 166, 116, 190, 174, 15, 147, 14, 190, 96, 133, 175, 144, 147, 229, 254, 86, 179, 74, 92, 34, 12, 205, 207, 110, 252, 51, 111, 197 };\n\
public static bool OnlyNeo(){\n\
Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;\n\
TransactionOutput[] outputs = tx.GetOutputs();\n\
foreach (TransactionOutput output in outputs)\n\
if (output.AssetId != NeoAssetId)\n\
return false;\n\
return true;\n\
}\n\
public static bool Main(byte[] signature){\n\
return (OnlyNeo());\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline single ONLY_GAS', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "rules" : [
      {
        "rule_type": "ALLOW_IF",
        "condition" : {
          "condition_type" : "ONLY_GAS"
        },
      },
    ]
  }

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
private static readonly byte[] GasAssetId = { 231, 45, 40, 105, 121, 238, 108, 177, 183, 230, 93, 253, 223, 178, 227, 132, 16, 11, 141, 20, 142, 119, 88, 222, 66, 228, 22, 139, 113, 121, 44, 96 };\n\
public static bool OnlyGas(){\n\
Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;\n\
TransactionOutput[] outputs = tx.GetOutputs();\n\
foreach (TransactionOutput output in outputs)\n\
if (output.AssetId != GasAssetId)\n\
return false;\n\
return true;\n\
}\n\
public static bool Main(byte[] signature){\n\
return (OnlyGas());\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});


test('Smacco() inline single CHARITY', () => {
  var config = {
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

  var code = "using Neo.SmartContract.Framework;\n\
using Neo.SmartContract.Framework.Services.Neo;\n\
using Neo.SmartContract.Framework.Services.System;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool SelfTransfer(){\n\
Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;\n\
TransactionOutput[] outputs = tx.GetOutputs();\n\
foreach (TransactionOutput output in outputs)\n\
if (output.ScriptHash != ExecutionEngine.ExecutingScriptHash)\n\
return false;\n\
return true;\n\
}\n\
private static readonly byte[] NeoAssetId = { 155, 124, 255, 218, 166, 116, 190, 174, 15, 147, 14, 190, 96, 133, 175, 144, 147, 229, 254, 86, 179, 74, 92, 34, 12, 205, 207, 110, 252, 51, 111, 197 };\n\
public static bool OnlyNeo(){\n\
Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;\n\
TransactionOutput[] outputs = tx.GetOutputs();\n\
foreach (TransactionOutput output in outputs)\n\
if (output.AssetId != NeoAssetId)\n\
return false;\n\
return true;\n\
}\n\
private static readonly byte[] GasAssetId = { 231, 45, 40, 105, 121, 238, 108, 177, 183, 230, 93, 253, 223, 178, 227, 132, 16, 11, 141, 20, 142, 119, 88, 222, 66, 228, 22, 139, 113, 121, 44, 96 };\n\
public static bool OnlyGas(){\n\
Transaction tx = (Transaction)ExecutionEngine.ScriptContainer;\n\
TransactionOutput[] outputs = tx.GetOutputs();\n\
foreach (TransactionOutput output in outputs)\n\
if (output.AssetId != GasAssetId)\n\
return false;\n\
return true;\n\
}\n\
public static bool Main(byte[] signature){\n\
if(VerifySignature(signature, pubkey_0))\n\
return true;\n\
if((VerifySignature(signature, pubkey_1)) && (((SelfTransfer()) && (OnlyNeo())) || (OnlyGas())))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});
