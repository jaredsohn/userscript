// ==UserScript==
// @name           lolRemover
// @namespace      http://userscripts.org/users/533160
// @description    Rimuove i lol/asd quello che volete dal forum di wis.
// @include        http://forum.wowis.org/*
// @copyright      phosphore
// @version        1.0.0
// @license        WTFPL (Do What the Fuck You Want to Public License)
// ==/UserScript==


// Nota: Puoi usare \\* per riferirti agli asterischi invece di usare wildcard.
//		 Puoi sostituire altre parole modificando la lista qui sotto.


var words = {
///////////////////////////////////////////////////////


// Sintassi: 'Parola da sostituire' : 'Parola sostituita',
"lol" : "",
"xD" : "",


///////////////////////////////////////////////////////
"":""};



//////////////////////////////////////////////////////////////////////////////
// Non modificare qui sotto
//////////////////////////////////////////////////////////////////////////////


String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}
