scr_meta=<><![CDATA[
// ==UserScript==
// @name           Perez Hilton is a Self-Important Twat
// @description    Replaces Perez Hilton's name on web pages
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
'Perez Hilton' : 'The Self-Important Twat',
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

// Auto update by Sizzlemctwizzle
aaus_38017={
i:'52468', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, '')