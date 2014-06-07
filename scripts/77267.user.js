// ==UserScript==
// @name           Aightgenossen Enhanced
// @description    Wenn Aightgenossen mal wieder richtig nervt...
// @include        http://*.aightgenossen.ch/*
// @copyright      Dagget
// @version        1.0.0
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Suchwort' : 'Ersatz',
"AlMaestro" : "das homophobe Kind",
"das homophobe Kind der Boss" : "Ich oute mich am 06.06.2010",
"www.myspace.com/almaestro7" : "www.jungundneugierig.ch/bi-sexualitaet",
"aber ich steh nur auf frauen" : "vielleicht kann ich in nicht allzuferner zukunft auch dazu stehen",
///////////////////////////////////////////////////////
"":""};


//////////////////////////////////////////////////////////////////////////////
// Nun folgt der richtige Code, nichts ändern!
//////////////////////////////////////////////////////////////////////////////


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