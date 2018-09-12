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
    code += this.csGenerateSingleAccount(rules);
  if(this.config.input_type == "array")
    code += this.csGenerateArrayAccount(rules);
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

Smacco.prototype.csGenerateSingleAccount = function(rules) {
  var code = "public static bool Main(byte[] signature){\n"
  for(var r=0; r<rules.length; r++) {

  }
	return code;
};

Smacco.prototype.csGenerateArrayAccount = function(rules, pubkey_list=[]) {
  var code = "public static bool Main(byte[][] signatures){\n";
  code += "byte[][] pubkeys = new[] {";
  for(var pk=0; pk<pubkey_list.length; pk++) {
    code += "pubkey"+pk;
    if(pk != pubkey_list.length-1)
      code += ", ";
  }
  code += "};\n";
  for(var r=0; r<rules.length; r++) {

  }
	return code;
};

Smacco.prototype.csGenerateRule = function(rule) {
  var code_condition = this.csGenerateCondition(rule.condition);
  var code = "if("+code_condition+")\nreturn ";
  if(rule.rule_type = "DENY_IF")
    code += "false;\n";
  if(rule.rule_type = "ALLOW_IF")
    code += "true;\n";
	return code;
};

Smacco.prototype.csGenerateCondition = function(condition) {

  var code = "if(\n";
	return code;
};


exports.Smacco = Smacco;
})(typeof exports !== 'undefined' ? exports : this);
