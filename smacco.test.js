const Smacco = require('./smacco').Smacco;

test('Smacco() Single ALLOW_ALL', () => {
  var config = {
    "standard": "smacco-1.0",
    "input_type" : "single",
    "default_rule" : "ALLOW_ALL"
  }

  var code = "using Neo.SmartContract.Framework;\n\
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
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
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
    "default_rule" : "ALLOW_ALL"
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {};\n\
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
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {};\n\
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
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {pubkey_0};\n\
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
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
    "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
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
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
    "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "rules" : [
      {
          "rule_type": "ALLOW_IF",
          "condition" : {
            "condition_type" : "CHECKMULTISIG",
            "condition_name" : "CheckMultiSig2",
            "pubkeys"  : [
                "pubkey_0",
                "pubkey_1",
              ],
            "signatures" : [
              "input_0",
              "input_1",
              ]
          },
      }
    ],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig2(byte[][] input, byte[][] pubkey){\n\
byte[][] vpub = new[] {pubkey[0], pubkey[1]};\n\
byte[][] vsig = new[] {input[0], input[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
if(CheckMultiSig2(signatures, pubkeys))\n\
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
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
    "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "rules" : [
      {
          "rule_type": "ALLOW_IF",
          "condition" : {
            "condition_type" : "CHECKMULTISIG",
            "condition_name" : "CheckMultiSig23",
            "pubkeys"  : [
                "pubkey_0",
                "pubkey_1",
                "pubkey_2",
              ],
            "signatures" : [
              "input_0",
              "input_1",
              ]
          },
      }
    ],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig23(byte[][] input, byte[][] pubkey){\n\
byte[][] vpub = new[] {pubkey[0], pubkey[1], pubkey[2]};\n\
byte[][] vsig = new[] {input[0], input[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
if(CheckMultiSig23(signatures, pubkeys))\n\
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
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb",
      "0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d", "02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4"],
    "rule" : {
      "rule_type": "ALLOW_IF",
      "condition" : {
        "condition_type" : "CHECKMULTISIG",
        "condition_name" : "CheckMultiSig23",
        "minimum_required" : "2"
      },
    },
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey_0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static readonly byte[] pubkey_1 = \"0303897394935bb5418b1c1c4cf35513e276c6bd313ddd1330f113ec3dc34fbd0d\".HexToBytes();\n\
public static readonly byte[] pubkey_2 = \"02e2baf21e36df2007189d05b9e682f4192a101dcdf07eed7d6313625a930874b4\".HexToBytes();\n\
public static bool CheckMultiSig23(byte[][] input, byte[][] pubkey){\n\
byte[][] vpub = new[] {pubkey[0], pubkey[1], pubkey[2]};\n\
byte[][] vsig = new[] {input[0], input[1]};\n\
return VerifySignatures(vsig, vpub);\n\
}\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {pubkey_0, pubkey_1, pubkey_2};\n\
if(CheckMultiSig23(signatures, pubkeys))\n\
return true;\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});
