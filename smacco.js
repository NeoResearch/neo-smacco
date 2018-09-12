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
  if(this.config.input_type == "single")
    code += this.csGenerateSingleAccount();
  if(this.config.input_type == "array")
    code += this.csGenerateArrayAccount();
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

Smacco.prototype.csGenerateSingleAccount = function() {
  var code = "public static bool Main(byte[] signature){\n"
	return code;
};

Smacco.prototype.csGenerateArrayAccount = function() {
  var code = "public static bool Main(byte[][] signatures){\n";
	return code;
};


exports.Smacco = Smacco;
})(typeof exports !== 'undefined' ? exports : this);
