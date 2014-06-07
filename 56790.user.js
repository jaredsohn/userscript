// ==UserScript==
// @name           Nano to Really Fucking small
// @namespace      http
// @description    Changes all Nano words and prefixes to really fucking small
// @include        http://*
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
'nano' : 'really fucking small',
'Nano' : 'Really fucking small',
'nanotechnology' : 'really fucking small technology',
'Nanotechnology' : 'really fucking small technology',
'nanobee' : 'really fucking small overlord bee',
'Shikaku' : 'God and King Shikaku',
///////////////////////////////////////////////////////
'':''};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

function isOkTag(tag) {
var ok = true;
var badTags = ['a','pre','blockquote','code','input','button','textarea'];
Array.forEach(badTags, function(badTag) {if(tag==badTag) {ok=false;}});
return ok;
}

var regexs=[],
	replacements=[];
for(var word in words) {
regexs.push(new RegExp(word.replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null);
for(var i=texts.snapshotLength-1; (this_text=texts.snapshotItem(i)); i--) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=regexs.length-1; x>=0; x--) {
	text = text.replace(regexs[x], replacements[x]);
	}
	this_text.textContent = text;
	}
}