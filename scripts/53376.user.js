scr_meta=<><![CDATA[
// ==UserScript==
// @name           Ugh My Life
// @namespace      http://userscripts.org/users/98740
// @description    Replaces text on websites. Now supports wildcards in search queries. Won't replace text in certain tags like links and code blocks
// @include        http://*.fmylife.com/*
// @copyright      Coby White
// @orginalAuthor  Joe Simmons
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
'FML' : 'UGH',
'FMyLife' : 'UghMyLife',
'I agree, your life is f**ed' : 'I agree, your life is just so ugh!',
'you deserved that one' : 'just go kill yourself',
"My life sucks but I don't give a f***" : 'My life is just so... ugh!',
///////////////////////////////////////////////////////
'':''};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

function isOkTag(tag) {
var ok = true;
var badTags = ['pre','blockquote','code','input','button','textarea'];
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