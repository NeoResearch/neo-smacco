
   function firstCharToLowerCase(str) {
		if(str == "")
			return "";
		return str.charAt(0).toLowerCase() + str.slice(1);
	}


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	//console.log(e.target.dataset.target)


        if($("#csharpcode.tab-pane.active.cont").length != 0) {
            updateCompilersSelectionBox("docker-mono-neo-compiler");
            //console.log("C# Compile");
        }
        if($("#pythoncode.tab-pane.active.cont").length != 0) {
            updateCompilersSelectionBox("docker-neo-boa");
            //console.log("Python Compile");
        }
        if($("#golangcode.tab-pane.active.cont").length != 0) {
            updateCompilersSelectionBox("docker-neo-go");
            //console.log("Golang Compile");
        }
        if($("#javacode.tab-pane.active.cont").length != 0) {
            updateCompilersSelectionBox("docker-java-neo-compiler");
            //console.log("Java Compile");
        }

    });

    //===============================================================
    $("#formCompile").submit(function (e) {
        $("#compilebtn")[0].disabled = true;
        $("#code_cs").val("");
        $("#code_python").val("");
        $("#code_golang").val("");
        $("#code_java").val("");
        if($("#csharpcode.tab-pane.active.cont").length != 0) {
            $("#code_cs").val(ace.edit("editorCSharp").getSession().getValue());
            console.log("C# Compile");
        }
        if($("#pythoncode.tab-pane.active.cont").length != 0) {
            $("#code_python").val(ace.edit("editorPython").getSession().getValue());
            console.log("Python Compile");
        }
        if($("#golangcode.tab-pane.active.cont").length != 0) {
            $("#code_golang").val(ace.edit("editorGolang").getSession().getValue());
            console.log("Golang Compile");
        }
        if($("#javacode.tab-pane.active.cont").length != 0) {
            $("#code_java").val(ace.edit("editorJava").getSession().getValue());
            console.log("Java Compile");
        }
        $("#codewarnerr").val("");
        $("#codeavm").val("");
        $("#opcodes").val("");
        $("#codeabi").val("");
        $("#contracthash").val("");
        //$("#contracthash_search").val("");
        $("#invokehash").val("");
        $("#contractparams").val("\"\"");
        e.preventDefault(); // Prevents the page from refreshing
        var $this = $(this); // `this` refers to the current form element
        var indata = $(this).serialize();
        $.post(
            BASE_PATH_COMPILERS + $this.attr("action"), // Gets the URL to sent the post to
            indata, // Serializes form data in standard format
            function (data) {
                console.log("finished compiling");
                $("#compilebtn")[0].disabled = false;
                var coderr = atob(data.output);
                $("#codewarnerr").val(coderr);
                var hexcodeavm = atob(data.avm);
                $("#codeavm").val(hexcodeavm);
                hexcodeavm = hexcodeavm.replace(/(\r\n|\n|\r)/gm, "");
                $("#opcodes").val("");
                //printOpcode(hexcodeavm, $("#opcodes"));
                //console.log("GRAVANDO BINARIO: "+typeof(datacontent)+":"+datacontent);
                localStorage.setItem('avmFile', hexcodeavm);//, {type: 'application/octet-stream'});
                //datacontent = localStorage.getItem('avmFile', {type: 'application/octet-stream'});
                //console.log("LENDO BINARIO: "+typeof(datacontent)+":"+datacontent);

                //console.log(localStorage.getItem('avmFile').charCodeAt(0));
                //console.log(localStorage.getItem('avmFile').charCodeAt(1));
                //console.log(localStorage.getItem('avmFile').charCodeAt(2));
                //$("#btn_download")[0].style = "";

                $("#contracthash")[0].value = getScriptHashFromAVM(hexcodeavm);
		$("#contracthashjs")[0].value = getScriptHashFromAVM(hexcodeavm);
                //$("#contracthash_search")[0].value = $("#contracthash")[0].value;
                $("#invokehash")[0].value = $("#contracthash")[0].value;
                $("#invokehashjs")[0].value = $("#contracthash")[0].value;
                $("#gsf_contracthash")[0].value = $("#contracthash")[0].value;

                var codeabi = atob(data.abi);
                console.log(codeabi);

                inputbox2 = document.getElementById("invokefunctionpy");
                while(inputbox2.options.length > 0)
                   inputbox2.remove(0);
                inputboxjs2 = document.getElementById("invokefunctionjs");
                while(inputboxjs2.options.length > 0)
                   inputboxjs2.remove(0);

                option = document.createElement("option");
                option.text = "Main";
                option.value = "Main";
                inputbox2.add(option);

                option2 = document.createElement("option");
                option2.text = "Main";
                option2.value = "Main";
                inputboxjs2.add(option2);

                if( codeabi.length != 0)
                {
                    jsonABI = JSON.parse(codeabi);

                    var textAbi = "ScriptHash (reversed): " + jsonABI["hash"] + "\n";
                    textAbi += "Entry Point:" + jsonABI["entrypoint"] + "\n";
                    textAbi += "Functions:" + "\n";

                    for (var i = 0; i < jsonABI["functions"].length; i++)
                    {
                        textAbi += "\t" +
                            jsonABI["functions"][i]["returntype"] + " " +
                            jsonABI["functions"][i]["name"] + "(";

                        if(jsonABI["functions"][i]["name"] != "Main") {
                            option = document.createElement("option");
                            option.text  = firstCharToLowerCase(jsonABI["functions"][i]["name"]);
                            option.value = firstCharToLowerCase(jsonABI["functions"][i]["name"]);
                            inputbox2.add(option);
                            option2 = document.createElement("option");
                            option2.text  = firstCharToLowerCase(jsonABI["functions"][i]["name"]);
                            option2.value = firstCharToLowerCase(jsonABI["functions"][i]["name"]);
                            inputboxjs2.add(option2);
                        }

                        for (var f = 0; f < jsonABI["functions"][i]["parameters"].length; f++)
                        {
                            textAbi += jsonABI["functions"][i]["parameters"][f]["type"] + " " +
                                jsonABI["functions"][i]["parameters"][f]["name"];
                            if( f != jsonABI["functions"][i]["parameters"].length - 1 )
                                textAbi += ", ";
                        }
                        textAbi += ");\n";
                    }
                    textAbi += "Events:" + "\n";
                    for (var e = 0; e < jsonABI["events"].length; e++)
                    {
                        textAbi += "\t" +
                            jsonABI["events"][e]["returntype"] + " " +
                            jsonABI["events"][e]["name"] + "(";
                        for (var f = 0; f < jsonABI["events"][e]["parameters"].length; f++)
                        {
                            textAbi += jsonABI["events"][e]["parameters"][f]["type"] + " " +
                                jsonABI["events"][e]["parameters"][f]["name"];
                            if( f != jsonABI["events"][e]["parameters"].length - 1 )
                                textAbi += ", ";
                        }
                        textAbi += ");\n";
                    }

                    console.log(codeabi);
                    $("#codeabi").val(textAbi);

                    // parse ABI json
                    console.log("Parsing ABI json");
                    // look for Main function
                    var i = 0;
                    for (i = 0; i < jsonABI["functions"].length; i++)
                        if (jsonABI["functions"][i]["name"] == "Main") {
                            console.log("Found function 'Main' with id=" + i);
                            break;
                        }

                    // get parameters
                    $("#contractparams")[0].value = "\"\"";
						  $("#contractparamsjs")[0].value = "";
						  $("#contractparamnamesjs")[0].value = "";
                    var j = 0;
                    console.log("Parameter count:" + jsonABI["functions"][i]["parameters"].length);
						  var paramhex = "";
						  var paramnames = "";
                    for (j = 0; j < jsonABI["functions"][i]["parameters"].length; j++) {
                        var phex = getHexForType(jsonABI["functions"][i]["parameters"][j]["type"]);
                        console.log("parameter[" + j + "]: " + jsonABI["functions"][i]["parameters"][j]["type"] + " -> hex(" + phex + ")");
                        paramhex += phex;
								paramnames += jsonABI["functions"][i]["parameters"][j]["type"]+"\t";
                    }
						  if(paramhex.length > 0) {
                    		$("#contractparams")[0].value = paramhex;
						  		$("#contractparamsjs")[0].value = paramhex;
								$("#contractparamnamesjs")[0].value = paramnames;
						  }
						  else
						  		$("#contractparamnamesjs")[0].value = "no parameters";

                    // set invoke params to many empty strings (at least one is desirable for now)
						  // PYTHON
                    $("#invokeparams")[0].value = "\"\"";
						  for (j = 1; j < jsonABI["functions"][i]["parameters"].length; j++)
                        $("#invokeparams")[0].value += " \"\"";
						  // JS
						  $("#cbx_usearray_js")[0].checked = false;
						  if(paramhex=="0710") // enable array passing
						  		$("#cbx_usearray_js")[0].checked = true;
						  updateArrayInvokeParamsJs(); // update auxiliary check boxes
						  updateInvokeParamsJs(); // update simple example

                    // get return hexcode
                    rettype = jsonABI["functions"][i]["returntype"];
                    $("#contractreturn")[0].value = getHexForType(rettype);
                    $("#contractreturnjs")[0].value = getHexForType(rettype);
                }
            },
            "json" // The format the response should be in
        );  //End of POST for Compile

    }); //End of form Compile function
    //===============================================================




    //===============================================================
    function createEditor(name, mode) {
        var editor = ace.edit(name);
        editor.setTheme("ace/theme/clouds");
        editor.session.setMode(mode);
        editor.setAutoScrollEditorIntoView(true);
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: false,
            maxLines: 30
        });
        editor.commands.addCommand({
            name: "showKeyboardShortcuts",
            bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
            exec: function (editor) {
                ace.config.loadModule("ace/ext/keybinding_menu", function (module) {
                    module.init(editor);
                    //editor.showKeyboardShortcuts() just shows when tigger the hotkey
                })
            }
        })
        return editor
    }

    //===============================================================

 

    function GetOpcodes() {
         console.log("disassembly opcodes...");
         $("#txt_opcodes").val("");
         hexavm = $("#codeavm").val();
         hexavm = hexavm.replace(/(\r\n|\n|\r)/gm, "");
         printOpcode(hexavm, $("#txt_opcodes"));
    }

    //===============================================================

    function setExample( selected_index ){
        console.log("selecting example:"+selected_index);

        editorCSharp.getSession().setValue("");

		  getfile(selected_index, 0);
		  /*
		  var numfiles = cSharpFiles[selected_index].length;
		  if(numfiles == 1) {
	        console.log("example file is: "+file);
		  } else {
			  var file_i = 0;
			  while(file_i < numfiles) {

			  }
		  }
		  */
    }

	 function getfile(selected_index, index=0) {
		 var numfiles = cSharpFiles[selected_index].length;
		 if(index < numfiles) {
		 	var file = cSharpFiles[selected_index][index];
			console.log("getting example file: "+file);
			$.get(file, function (data) {
			 	editorCSharp.getSession().setValue(editorCSharp.getSession().getValue() + data);
				getfile(selected_index, index+1);
			});
	 	 }
	 }
    //===============================================================

  

   //===============================================================
   function convertParam(type, value) {
     if(type == "String")
        return "\""+value+"\"";
     if(type == "Address")
        return "\""+value+"\"";
     if(type == "Hex")
        return "b'"+Neon.u.str2hexstring(Neon.u.hexstring2str(value))+"'";
     if(type == "Integer")
        return ""+Number(value);
     return "";
   }
   //===============================================================


