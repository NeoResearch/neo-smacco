// SMACCO implementation on javascript, generating C# code
// SMart ACcount COmposer
// MIT License

(function(exports) {
"use strict";

function Smacco(config) {
  if(config.version == "smacco-1.0")
	  this.config = config;
  else
    console.log("Unsupported version: "+config.version);
}

Smacco._construct = function(config) {
	return new Smacco(config);
};


Smacco.prototype.csGenerateAccount = function() {
  var code = this.csGenerateHeaders();
  var rules = [];
  if(this.config.rules)
    rules = this.config.rules;
  if(this.config.input_type == "single")
    code += Smacco.csGenerateSingleAccount(rules);
  if(this.config.input_type == "array") {
    var pubkey_list = [];
    if(this.config.pubkey_list)
      pubkey_list = this.config.pubkey_list;
    code += Smacco.csGeneratePubKeyList(pubkey_list);
    code += Smacco.csGenerateArrayAccount(rules, pubkey_list);
  }
  code += this.csGenerateFooter();
	return code;
};

Smacco.prototype.csGenerateHeaders = function() {
  var code = "using Neo.SmartContract.Framework;\n\
namespace NeoContract1 {\n\
public class Contract1 : SmartContract {\n\
";
	return code;
};

Smacco.prototype.csGenerateFooter = function() {
  var code = "";
  if(this.config.default_rule == "DENY_ALL")
    code += "return false;\n";
  else if(this.config.default_rule == "ALLOW_ALL")
    code += "return true;\n";
  code += "}\n\
}\n\
}\n\
";
	return code;
};

Smacco.csGeneratePubKeyList = function(pubkey_list) {
  var code = "";
  for(var pk=0; pk<pubkey_list.length; pk++)
    code += "public static readonly byte[] pubkey_"+pk+" = \""+pubkey_list[pk]+"\".HexToBytes();\n";
  return code;
}

Smacco.csGenerateSingleAccount = function(rules) {
  var code = "public static bool Main(byte[] signature){\n"
  for(var r=0; r<rules.length; r++) {

  }
	return code;
};

Smacco.csGenerateArrayAccount = function(rules, pubkey_list=[]) {
  var code = "public static bool Main(byte[][] signatures){\n";
  code += "byte[][] pubkeys = new[] {";
  for(var pk=0; pk<pubkey_list.length; pk++) {
    code += "pubkey_"+pk;
    if(pk != pubkey_list.length-1)
      code += ", ";
  }
  code += "};\n";
  for(var r=0; r<rules.length; r++) {
    var rule_output = Smacco.csGenerateRule(rules[r]);
    code = rule_output.methods + code + rule_output.main_code;
  }
	return code;
};

Smacco.csGenerateRule = function(rule) {
  var struct_condition = Smacco.csGenerateCondition(rule.condition);
  var code = "if("+struct_condition.condition_code+")\nreturn ";
  if(rule.rule_type == "DENY_IF")
    code += "false;\n";
  else if(rule.rule_type == "ALLOW_IF")
    code += "true;\n";
	return {main_code: code, methods: struct_condition.methods};
};

Smacco.csGenerateCondition = function(condition) {
  var lcode = "";
  var lmethods = "";
  if(condition.condition_type == "CHECKMULTISIG") {
    lcode = condition.condition_name+"(signatures, pubkeys)";
    lmethods = "public static bool "+condition.condition_name+"(byte[][] input, byte[][] pubkey){\n\
byte[][] vpub = new[] {";
    for(var pb=0; pb<condition.pubkeys.length;pb++) {
      lmethods += "pubkey["+pb+"]";
      if(pb != condition.pubkeys.length-1)
        lmethods+=", ";
    }
    lmethods += "};\n\
byte[][] vsig = new[] {";
    for(var sig=0; sig<condition.signatures.length;sig++) {
      lmethods += "input["+sig+"]";
      if(sig != condition.signatures.length-1)
        lmethods+=", ";
    }
    lmethods += "};\n\
return VerifySignatures(vsig, vpub);\n";
    lmethods += "}\n";
  }
  else {
    lcode = "true";
    lmethods = "";
  }

	return {condition_code: lcode, methods: lmethods};
};


exports.Smacco = Smacco;
})(typeof exports !== 'undefined' ? exports : this);
