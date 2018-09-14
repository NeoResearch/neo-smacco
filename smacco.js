// SMACCO implementation on javascript, generating C# code
// SMart ACcount COmposer
// MIT License

(function(exports) {
"use strict";

function Smacco(config) {
  if(config.standard == "smacco-1.0")
	  this.config = config;
  else
    console.log("Unsupported standard: "+config.standard);
}

Smacco._construct = function(config) {
	return new Smacco(config);
};


Smacco.prototype.csGenerateAccount = function() {
  var code = this.csGenerateHeaders();
  var rules = [];
  if(this.config.rules)
    rules = this.config.rules;
  else if(this.config.rule)
    rules.push(this.config.rule);
  var pubkey_list = [];
  if(this.config.pubkey_list)
    pubkey_list = this.config.pubkey_list;
  code += Smacco.csGeneratePubKeyList(pubkey_list);
  if(this.config.input_type == "single")
    code += Smacco.csGenerateSingleAccount(rules, pubkey_list, (!this.config.inline_last));
  if(this.config.input_type == "array")
    code += Smacco.csGenerateArrayAccount(rules, pubkey_list, (!this.config.inline_last));
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
  // "default_rule" ignores "inline_last" parameter... to inline last, must not use default!
  // if inline is disabled, or any default_rule is presented
  if((this.config.inline_last == "disabled") || this.config.default_rule) {
    if(this.config.default_rule == "DENY_ALL")
      code += "return false;\n";
    else if(this.config.default_rule == "ALLOW_ALL")
      code += "return true;\n";
  }
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

Smacco.csGenerateSingleAccount = function(rules, pubkey_list, inline_last=true) {
  var code = "public static bool Main(byte[] signature){\n";
  var has_return = false;
  for(var r=0; r<rules.length; r++) {
    var rule_output = Smacco.csGenerateRule(rules[r], pubkey_list, (inline_last&&(r==rules.length-1)) );
    code = rule_output.methods + code + rule_output.main_code;
  }
	return code;
};

Smacco.csGenerateArrayAccount = function(rules, pubkey_list, inline_last=true) {
  var code = "public static bool Main(byte[][] signatures){\n";
  for(var r=0; r<rules.length; r++) {
    var rule_output = Smacco.csGenerateRule(rules[r], pubkey_list, (inline_last&&(r==rules.length-1)) );
    code = rule_output.methods + code + rule_output.main_code;
  }
	return code;
};

Smacco.csGenerateRule = function(rule, pubkey_list, should_inline=false) {
  var struct_condition = Smacco.csGenerateCondition(rule.condition, pubkey_list);
  if(should_inline) {
    var code = "return ("+struct_condition.condition_code+");\n";
  }
  else {
    var code = "if("+struct_condition.condition_code+")\nreturn ";
    if(rule.rule_type == "DENY_IF")
      code += "false;\n";
    else if(rule.rule_type == "ALLOW_IF")
      code += "true;\n";
  }
	return {main_code: code, methods: struct_condition.methods};
};

Smacco.csGenerateCondition = function(condition, pubkey_list) {
  var lcode = "";
  var lmethods = "";
  if(condition.condition_type == "CHECKMULTISIG") {
    var local_pubkey_list = pubkey_list;
    // if parameter "pubkeys", use it!
    if(condition.pubkeys)
      local_pubkey_list = condition.pubkeys;
    var sigCount = -1;
    if(condition.minimum_required)
      sigCount = condition.minimum_required;
    if((sigCount == -1) && (condition.signatures))
      sigCount = condition.signatures.length;
    var condName = "";
    if(condition.condition_name)
       condName = condition.condition_name;
    if(condName == "") // standard function name
      condName="CheckMultiSig"+sigCount+"_"+local_pubkey_list.length;

    lcode = condName+"(signatures)";
    lmethods = "public static bool "+condName+"(byte[][] signatures){\n\
byte[][] vpub = new[] {";

    for(var pb=0; pb<local_pubkey_list.length;pb++) {
      lmethods += "pubkey_"+pb;
      if(pb != local_pubkey_list.length-1)
        lmethods+=", ";
    }
    lmethods += "};\n\
byte[][] vsig = new[] {";
    if(condition.signatures)
      for(var sig=0; sig<condition.signatures.length;sig++) {
        lmethods += "signatures["+sig+"]";
        if(sig != condition.signatures.length-1)
          lmethods+=", ";
      }
    else if(condition.minimum_required)
      for(var sig=0; sig<condition.minimum_required;sig++) {
        lmethods += "signatures["+sig+"]";
        if(sig != condition.minimum_required-1)
          lmethods+=", ";
      }
    lmethods += "};\n\
return VerifySignatures(vsig, vpub);\n";
    lmethods += "}\n";
  }
  else if(condition.condition_type == "CHECKSIG") {
    var pbkey = "0"; // default is pubkey_0
    if(condition.pubkey)
      pbkey = condition.pubkey;
    lcode = "VerifySignature(signature, pubkey_"+pbkey+")";
    lmethods = "";
  }
  else {
    lcode = "true";
    lmethods = "";
  }

	return {condition_code: lcode, methods: lmethods};
};


exports.Smacco = Smacco;
})(typeof exports !== 'undefined' ? exports : this);
