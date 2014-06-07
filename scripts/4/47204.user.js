scr_meta=<><![CDATA[
// ==UserScript==
// @name           Userscripts Quick Links
// @namespace      http://userscripts.org/users/23652
// @description    Replaces certain words with links to those words, example: Firebug would be replaced with the link to Firebug
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @exclude        http://userscripts.org/topics/new*
// @exclude        https://userscripts.org/topics/new*
// @copyright      JoeSimmons
// @version        1.0.7
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

var words_n_links = {
// ADD WORDS AND LINKS HERE LIKE THIS (CASE SENSITIVE)
// Syntax below
// 'Word' : 'Replacement',
'Dive Into Greasemonkey' : 'http://diveintogreasemonkey.org/',
'Firebug' : 'https://addons.mozilla.org/en-US/firefox/addon/1843',
'Greasespot' : 'http://wiki.greasespot.net/Main_Page',
'Greasemonkey' : 'https://addons.mozilla.org/en-US/firefox/addon/748',
'Stylish' : 'https://addons.mozilla.org/en-US/firefox/addon/2108',
'JavaScript' : 'http://www.tizag.com/javascriptT/',
'HTML' : 'http://www.tizag.com/htmlT/',
'CSS' : 'http://www.tizag.com/cssT/',
'Pastebin' : 'http://pastebin.com/',
'DataURI' : 'http://www.dopiaza.org/tools/datauri/',
'Userstyles' : 'http://userstyles.org/',
'W3schools' : 'http://www.w3schools.com/',
'GM_xmlhttpRequest' : 'http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html',
'':''};

// Get ID
function $(ID) {return document.getElementById(ID);}

function fix(e) {
if(GM_getValue('uso_quicklinks', 'on')=='on')
for(w in words_n_links) {
if(w!='' && e.target.value.indexOf(w)!=-1 && !(new RegExp('<blockquote>[\s\D\w]*'+w+'[\s\D\w]*<\/blockquote>').test(e.target.value)) && !(new RegExp(w+'</a>').test(e.target.value))) {
e.target.value = e.target.value.replace(new RegExp(w+'(?!\<\/a\>)', 'g'), '<a href="'+words_n_links[w]+'">'+w+'</a>');
}
}
}

function toggleOnOff() {
if(GM_getValue('uso_quicklinks', 'on')=='on') {
GM_setValue('uso_quicklinks', 'off');
alert('Userscripts Quick Links is now off.');
}
else {
GM_setValue('uso_quicklinks', 'on');
alert('Userscripts Quick Links is now on.');
}
}

$('post_body').addEventListener('keyup', fix, false);

var edits = document.evaluate("//a[contains(@href, '/edit') and contains(., 'Edit post')]",document,null,6,null),
	i = edits.snapshotLength;
while(edit=edits.snapshotItem(--i)) {
edit.addEventListener('click', function(){
var d = document.createElement('div');
d.id = 'test_edit_quicklicks';
$('edit').appendChild(d);
var intv = setInterval(function(){
if(!$('test_edit_quicklicks')) {
clearInterval(intv);
$('edit_post_body').addEventListener('keyup', fix, false);
}
}, 100);
}, false);
}

GM_registerMenuCommand('Toggle Quick Links', toggleOnOff);

// Auto-Update by sizzlemctwizzle
aaus_38017={
i:'47204', // Script id on Userscripts.org
d:2, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();