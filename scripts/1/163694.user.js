// ==UserScript==
// @name        DR WHO REPLACER
// @description DR WHO
// @namespace  SAGE
// @version     1
// @author      BAG OF DICKS
// @licence     TO KILL
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////


// Syntax: 'Search word' : 'Replace word',
"Dr Who" : "I AM A FAGGOT RUMP MY HUMP",
"Dr. Who" : "I AM A FAGGOT RUMP MY HUMP",
"Doctor Who" : "I AM A FAGGOT RUMP MY HUMP",
"TARDIS" : "I AM A FAGGOT RUMP MY HUMP",
"Tardis" : "I AM A FAGGOT RUMP MY HUMP",
"dr who" : "I AM A FAGGOT RUMP MY HUMP",
dr. who" : "I AM A FAGGOT RUMP MY HUMP",
"The Doctor" : "I AM A FAGGOT RUMP MY HUMP",
"Dr Who." : "I AM A FAGGOT RUMP MY HUMP",
"Dr. Who." : "I AM A FAGGOT RUMP MY HUMP",
"Doctor Who." : "I AM A FAGGOT RUMP MY HUMP",
"TARDIS." : "I AM A FAGGOT RUMP MY HUMP",
"Tardis." : "I AM A FAGGOT RUMP MY HUMP",
"dr who." : "I AM A FAGGOT RUMP MY HUMP",
dr. who." : "I AM A FAGGOT RUMP MY HUMP",
"The Doctor." : "I AM A FAGGOT RUMP MY HUMP",
"Dr Who," : "I AM A FAGGOT RUMP MY HUMP",
"Dr. Who," : "I AM A FAGGOT RUMP MY HUMP",
"Doctor Who," : "I AM A FAGGOT RUMP MY HUMP",
"TARDIS," : "I AM A FAGGOT RUMP MY HUMP",
"Tardis," : "I AM A FAGGOT RUMP MY HUMP",
"dr who," : "I AM A FAGGOT RUMP MY HUMP",
dr. who," : "I AM A FAGGOT RUMP MY HUMP",
"The Doctor," : "I AM A FAGGOT RUMP MY HUMP",
// You can add your own here.

///////////////////////////////////////////////////////
"":""};

String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

// Function to decide whether a parent tag will have its text replaced or not
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}

// Convert the "words" JSON object to an Array
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}

// Do the replacement
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}