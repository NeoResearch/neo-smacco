const Smacco = require('./smacco').Smacco;

test('Smacco() Single ALLOW_ALL', () => {
  var config = {
    "version": "smacco-1.0",
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
    "version": "smacco-1.0",
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


test('Smacco() Multi ALLOW_ALL', () => {
  var config = {
    "version": "smacco-1.0",
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


test('Smacco() Multi DENY_ALL', () => {
  var config = {
    "version": "smacco-1.0",
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

test('Smacco() Multi PK1 DENY_ALL', () => {
  var config = {
    "version": "smacco-1.0",
    "input_type" : "array",
    "pubkey_list" : ["036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb"],
    "default_rule" : "DENY_ALL",
  }

  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
public static readonly byte[] pubkey0 = \"036245f426b4522e8a2901be6ccc1f71e37dc376726cc6665d80c5997e240568fb\".HexToBytes();\n\
public static bool Main(byte[][] signatures){\n\
byte[][] pubkeys = new[] {pubkey0};\n\
return false;\n\
}\n\
}\n\
}\n\
";
  expect(new Smacco(config).csGenerateAccount()).toBe(code);
});
