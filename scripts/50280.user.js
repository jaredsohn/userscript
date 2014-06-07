scr_meta=<><![CDATA[
// ==UserScript==
// @name           Reforma ortografii polskiej
// @namespace      http://userscripts.org/users/23652
// @description    Pokazuje wszystkie strony z radykalnie reformowana ortografia: sz -> š, rz -> ž, ą -> on itd.
// @include        http://*
// @include        https://*
// @include        file://*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons, jorges
// @version        1.0.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// Based on "Replace Text On Webpages" by JoeSimmons http://userscripts.org/scripts/show/41369
// ==/UserScript==
]]></>.toString();

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',

'Rz' : 'Ž',
'rz' : 'ž',

'Prz' : 'Pš',
'prz' : 'pš',

'Trz' : 'Tš',
'trz' : 'tš',

'Sz' : 'Š',
'sz' : 'š',

'Cz' : 'Č',
'cz' : 'č',

'Ch' : 'H',
'ch' : 'h',

'Ó' : 'U',
'ó' : 'u',

'Ż' : 'Ž',
'ż' : 'ž',

'Si' : 'Śi',
'si' : 'śi',

'ci' : 'Ći',
'ci' : 'ći',

'Ą' : 'ON',
'ą' : 'on',

'Ę' : 'EN',
'ę' : 'en',


 //////////////////////////////////////////////////////
'':''};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

function isOkTag(tag) {
var ok = true;
var badTags = ['a','pre','blockquote','code','input','button','textarea'];
var badTags = ['style'];
Array.forEach(badTags, function(badTag) {if(tag==badTag) {ok=false;}});
return ok;
}

var regexs=[],
	replacements=[];
for(var word in words) {
regexs.push(new RegExp(word.replace(/\*/g,'[^ ]*'), 'g'));
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
i:'41369', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();