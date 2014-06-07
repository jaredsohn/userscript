// ==UserScript==
// @name           ABB-remover
// @description    Erstatter (nesten) alle forekomster av Anders Behring Breivik og varianter med Mammadalten. Enjoy.
// @include        http://*
// @include        https://*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      ssy, based on Replace Text On Webpages (c) JoeSimmons
// @version        1,2
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==
// erstatter alle forekomster av Anders Behring Breivik med Fuckface. Enjoy.

var words = {

///////////////////////////////////////////////////////
"Anders Behring Breivik":"Ingen", "Anders Behring Breiviks":"Ingen", "Anders Breivik":"Mammadalten", "Anders Breiviks":"Ingen", "Behring Breivik":"ingen", "Behring Breiviks":"Ingen", "Breivik":"ingen", "Breiviks":"ingen"};
//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

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
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}