scr_meta=<><![CDATA[
// ==UserScript==
// @name           Remove T's
// @namespace      
// @description    Removes T's, as per Georgia Tech traditions. Most code taken from JoeSimmons( http://userscripts.org/users/23652)
// @include        http://*
// @include        https://*
// @include        file:*
// @exclude        http://pastebin.*/*
// @exclude        http://*.google.*/*
// @exclude        https://*.google.*/*
// @copyright      TimSwihart
// @version        1.0.4
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

var highlight_replaced_words = true;
var words = {

// Capitalization and Slang
't' : ' ',
'T' : ' ',
};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// addGlobalStyle
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') GM_addStyle(css);
    else if((head=document.getElementsByTagName('head')[0])) {
    var style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style).innerHTML = css;
	}
}
if(highlight_replaced_words) addGlobalStyle('.webjargon {border-color:#71B8FF;border-style:solid;border-top-width:1px;border-bottom-width:1px;border-left-width:0;border-right-width:0;}');

function isOkTag(tag) {
var ok = true;
var badTags = ['a','pre','blockquote','code','input','button','textarea'];
Array.forEach(badTags, function(badTag) {if(tag==badTag) {ok=false;}});
return ok;
}

function upper(r) {
return r.toUpperCase();
}

var regexs=[],
	replacements=[],
	full_regex='',
	wildcard_regex = /\*/g,
	lowercase_regex = /^\s*[a-z]/,
	caps_regex = /\. [a-z]/,
	tmp='';
for(var word in words) {
tmp = '\\b'+word.replace(wildcard_regex,'[^ ]*')+'\\b';
full_regex += '('+tmp+')|';
regexs.push(new RegExp(tmp, 'gi'));
replacements.push(words[word]);
}
full_regex = new RegExp(full_regex.replace(/\|$/,''));


var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null);
for(var i=texts.snapshotLength-1; (this_text=texts.snapshotItem(i)); i--) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent) && (lowercase_regex.test(text)||caps_regex.test(text)||full_regex.test(text))) {
	for(var x=regexs.length-1; x>=0; x--) {
	text = text.replace(regexs[x], replacements[x]);
	}

	// Fix cases
	if(lowercase_regex.test(text)) text = text.replace(lowercase_regex, upper);
	if(caps_regex.test(text)) text = text.replace(caps_regex, upper);

	if(!highlight_replaced_words) this_text.textContent = text;
	else {
	var span = document.createElement('span');
	span.setAttribute('class', 'webjargon');
	span.setAttribute('title', 'Original Text: '+this_text.textContent);
	span.textContent = text;
	this_text.parentNode.replaceChild(span, this_text);
	}
}
}