// ==UserScript==
// @name	KINGSAGE BOT by BF
// @namespace	KINGSAGE BOT by BF
// @description	KINGSAGE BOT by BF
// ==/UserScript==

var words = {
"Castelo" : "The BOT is not free. To purchase BOT contact: botbybf@gmail.com", "Castle" : "The BOT is not free. To purchase BOT contact: botbybf@gmail.com", "Castillo" : "The BOT is not free. To purchase BOT contact: botbybf@gmail.com", "Kasteel" : "The BOT is not free. To purchase BOT contact: botbybf@gmail.com", "?????" : "The BOT is not free. To purchase BOT contact: botbybf@gmail.com",
"":""};

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

/*
The BOT is not free.

To purchase contact:
botbybf@gmail.com


More information at:

botbybf@gmail.com
facebook.com/BotByBf
*/