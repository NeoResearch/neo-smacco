const Smacco = require('./smacco').Smacco;

test('Smacco() Single ALLOW_ALL', () => {
  var config = {
    "version": "smacco-1.0",
    "input_type" : "single",
    "pubkey_list" : [],
    "rules" : [
    ],
    "default_rule" : "ALLOW_ALL",
    "target_language" : "C#"
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
    "pubkey_list" : [],
    "rules" : [
    ],
    "default_rule" : "DENY_ALL",
    "target_language" : "C#"
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
