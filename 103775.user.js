// ==UserScript==
// @name           RCP Filter
// @namespace      http://localhost
// @description    Remove the writers and sources that you don't want to read. Based on Replace Text by Defiler21.
// @include        http://www.realclearpolitics.com/*
// @include        http://realclearpolitics.com/*
// @include        http://www.realclearworld.com/*
// @include        http://www.realclearenergy.com/*
// ==/UserScript==

if (GM_getValue("relations") == undefined){
	GM_setValue("relations", "\"\":\"\"");
}
var words = eval("new Object({"+GM_getValue("relations")+"})");

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp(word));
//"\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

 var textnodes, node, s, initlen; 

   textnodes = nativeTreeWalker();  //( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
        s = node.nodeValue;
        initlen = s.length;
      for(var x=0,l=regexs.length; x<l; x++) {
      s = s.replace(regexs[x], "");
      }
      if (s.length < initlen)
          {s = "";}    
       // textNodes.push(node.nodeValue);
        node.nodeValue = s;
    }
}



function addwords(){
        window.scrollTo(0, 0);

	function more(){
	var a = document.getElementById("wordtoreplace").value;
	var u = "entry_added";
//document.getElementById("replacement").value;
	var illegalChars=/\"/;
		if (a==""){
//&& u==""
			alert("Nothing input\nPress \"Done\" when finished");
		}else if(illegalChars.test(u)){
			alert("Illegal character in replacement:\n\"");
		}else{
			newReplacement = document.createElement('tr');
			var d = document.getElementById("added");
   			d.parentNode.insertBefore(newReplacement, d.nextSibling);
			newReplacement.className='relationship';
			newReplacement.textContent = a+" ==> "+u;
			newReplacement.id="\""+a+"\":\""+u+"\"";
		}
	}

	function done(){
		var relations = document.getElementsByTagName('tr').id;
		var allDivs = document.getElementsByClassName('relationship');
			for (var i = 0; i < allDivs.length; i++) {
   				var thisDiv = allDivs[i];
				GM_setValue("relations", GM_getValue("relations")+","+thisDiv.id)
			}
		var addwords = document.getElementById("addwords");
		addwords.parentNode.removeChild(addwords);
		window.location.reload()
	}

	var divTag = document.createElement("div");
	divTag.innerHTML = '<div align="center" id="addwords"><form name="addwords"><table cellspacing="0" border="2" style="height: 6em; left: 50%; margin-top: -12em; position: fixed; top: 50%; width: 30%; margin-left: -13em; z-index: 9999;"><tbody bgcolor="#2B547E" style="color:white; text-align:center;"><tr valign="top" height="10" align="center"><tr id="added" height="10">Author or source to remove:<font size="2"><input type="text" id="wordtoreplace" name="wordtoreplace" cellspacing="0" style="margin: 5px;"><input type="reset" id="more" value="+" title="Add"></font></tr><br></tr><tr valign="bottom" align="center"><font xmlns="http://www.w3.org/1999/xhtml"><input type="button" id="done" value="Done" title="Press to finish"></font></tr></tbody></table></form></div>';

//==&gt;<input type="text" id="replacement" name="replacement" cellspacing="0" style="margin: 5px;">
//goes after wordtoreplace

	document.body.insertBefore(divTag, document.body.firstChild);
	var m = document.getElementById("more");
	m.addEventListener("click", more, false);
	var o = document.getElementById("done");
	o.addEventListener("click", done, false);
}

function dump(){
	var answer = confirm  ("Are you sure you want to delete all word replacements?")
		if (answer){
			GM_setValue("relations", "\"\":\"\"");
			window.location.reload()
		}
}

function show(){
alert("Word replacement list logged to console\nIt is suggested that you clear the console first and then run this again to find the list easier\nTo navigate to the console, type Ctrl-Shift-J.");
GM_log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Replace Words List After This Line vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
GM_log("replacements are in the form \"word to replace\":\"replacement word\"");
GM_log(GM_getValue("relations"));
GM_log("\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^ Replace Words List Before This Line \^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^");
}
var stages = {"add": "add", "reset": "reset", "show": "show"};

for (var key in stages) {
        var menuStr = key;
        GM_registerMenuCommand(menuStr, (
            function(key) { return function() {
    if (key == "add") {addwords();}
    if (key == "reset") {dump();}
                if (key == "show") {show();}  }
            })(key) );
    }
