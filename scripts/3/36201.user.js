// ==UserScript==
// @name           Scanner Utility column 1
// @namespace      http://scanner.163.com
// @description    Process Student Code from Scanner
// @include        *
// ==/UserScript==

document.addEventListener('keydown', keypress_handler, false);

var studentCode = new Array();

function searchInput(id){
	var inputs = document.getElementsByTagName("input");	
	for(var i = 0 ;i  < inputs.length; i ++)
		if(inputs[i].value == id){
			inp = inputs[i];
			break;
		}
	if(inp){
			//alert(inp.id);
		 var re = /suniq([0-9]+)/i
		 var r = re.exec(inp.id);
		 if(r){
			 id = "scoren"+r[1]+"_1";			 
			 document.getElementById(id).focus();					
		}
	}
}

function keypress_handler(e) {
	
  //alert(e.keyCode);
 // alert(e.which); 
	if(e.keyCode == 113){
	  //alert("f2");
	  try{
			var inp = e.target;			
			if(inp && inp.tagName.toLowerCase()  == "input"){
				// lose focus
				inp.blur();
			//	alert("blur");
				document.body.focus();
			}
		}catch(s){
			// alert(s);
		}
	 
	 studentCode = new Array();
	} else if(e.keyCode == 13){
	  // enter
	  //alert(studentCode.join(""));
	  try{
	  	if(studentCode && studentCode.length > 0){
	  		searchInput(studentCode.join(""));
	  	}
	  }catch(t){
	  	// alert(t);
	  }
	} else {
	  studentCode.push(String.fromCharCode(e.keyCode));
	}
}