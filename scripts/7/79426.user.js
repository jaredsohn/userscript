// ==UserScript==
// @name           Replace Text
// @namespace      http://localhost
// @description    Use a UI to add words you want replaced to a list and have them replaced automatically with whatever you want.
// @include        *
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
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if((text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

function addwords(){

	function more(){
	var a = document.getElementById("wordtoreplace").value;
	var u = document.getElementById("replacement").value;
	var illegalChars=/\"/;
		if (a=="" && u==""){
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
		var allDivs = document.evaluate("//tr[@class='relationship']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allDivs.snapshotLength; i++) {
   				var thisDiv = allDivs.snapshotItem(i);
				GM_setValue("relations", GM_getValue("relations")+","+thisDiv.id)
			}
		var addwords = document.getElementById("addwords");
		addwords.parentNode.removeChild(addwords);
		window.location.reload()
	}

	var divTag = document.createElement("div");
	divTag.innerHTML = '<div align="center" id="addwords"><form name="addwords"><table cellspacing="0" border="2" style="height: 6em; left: 50%; margin-top: -12em; position: fixed; top: 50%; width: 30%; margin-left: -13em; z-index: 9999;"><tbody bgcolor="#2B547E" style="color:white; text-align:center;"><tr valign="top" height="10" align="center"><font size="2"><input type="text" id="wordtoreplace" name="wordtoreplace" cellspacing="0" style="margin: 5px;">==&gt;<input type="text" id="replacement" name="replacement" cellspacing="0" style="margin: 5px;"><input type="reset" id="more" value="+" title="Add"></font></tr><tr id="added" height="10">Word replacements to be added:<br></tr><tr valign="bottom" align="center"><font xmlns="http://www.w3.org/1999/xhtml"><input type="button" id="done" value="Done" title="Press to finish"></font></tr></tbody></table></form></div>';
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
alert("Word replacement list logged to console\nIt is suggested that you clear the console first and then run this again to find the list easier\nTo navigate to the console, go to Tools\>Error Console");
GM_log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Replace Words List After This Line vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
GM_log("replacements are in the form \"word to replace\":\"replacement word\"");
GM_log(GM_getValue("relations"));
GM_log("\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^ Replace Words List Before This Line \^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^\^");
}

GM_registerMenuCommand("Add words", addwords);
GM_registerMenuCommand("Dump all words", dump);
GM_registerMenuCommand("Show word list", show);