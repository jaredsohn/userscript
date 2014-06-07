// ==UserScript==
// @name           TouristTextReplacer
// @namespace      blocisdabest
// @description    Your people just want to have fun, in other countries...
// @include        http://www.bloc.name/foreign.php
// @include        https://www.bloc.name/foreign.php
// @copyright      JoeSimmons Original/Bloc Version JigglyDuff
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==


var words = {

//Code used under CC licence from JoeSimmons

// Syntax: 'Search word' : 'Replace word',
"Secret Agent" : "Tourist",
"Hire a man to run guns to your favorite terrorists, steal state secrets, and drink his martinis shaken not stirred. Allows you to take covert action in a country." : "Hire a tourist to see the world, trade souveniors, and learn the knowledge of foreign nations. Socks, sandals, and a telescopic lens are always in style!",
///////////////////////////////////////////////////////
"":""};



//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
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