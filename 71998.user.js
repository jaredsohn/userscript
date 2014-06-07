// ==UserScript==
// @name           Replace Text On Webpages
// @namespace      http://userscripts.org/users/23652
// @description    Replaces text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://*
// @include        https://*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.51
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"<!--" : "coment",
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

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) if(regexs[x].test(text)) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}