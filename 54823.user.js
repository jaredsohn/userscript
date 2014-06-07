scr_meta=<><![CDATA[
// ==UserScript==
// @name           Userscripts.org Easy Post Links
// @namespace      http://userscripts.org/users/23652
// @description    Adds customizable links to the reply/edit box on userscripts.org
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @require        http://userscripts.org/scripts/source/51532.user.js
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

var text_and_urls = {
// ADD TEXT AND URLS HERE LIKE THIS (CASE SENSITIVE)
// Syntax below
// 'Text' : 'URL',
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
'Error Console' : 'http://www.firefoxmastery.com/firefox/introducing-the-firefox-error-console/',
'How to post script code' : 'http://userscripts.org/forums/1/topics/9405',
'XPath' : 'https://developer.mozilla.org/en/DOM/document.evaluate',
'':''};

// Create by avg, modified by JoeSimmons
function create(a,b) {
	var ret=document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) {
			for(var i=0;i<prop.length;i++) ret.appendChild(prop[i]);
		}
		else if('style,accesskey,id,name,src,href,class'.indexOf(prop)!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}  return ret;
}

// addGlobalStyle
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') GM_addStyle(css);
    else if((head=document.getElementsByTagName('head')[0])) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
	style.innerHTML=css;
    head.appendChild(style);
	}
}

function addLink(e) {
e.preventDefault();
var msg = $g("#post_body") || $g("#edit_post_body");
if(!msg || msg.offsetWidth==0) msg=$g("#edit_post_body");
if(!msg || msg.offsetWidth==0) return;
var text = "<a href=\""+e.currentTarget.href+"\">"+e.currentTarget.textContent+"</a>",
	startPos = msg.selectionStart,
	endPos = msg.selectionEnd;
msg.value = msg.value.substring(0, startPos) + text + msg.value.substring(endPos, msg.value.length);
msg.setSelectionRange(endPos+text.length, endPos+text.length);
msg.focus();
msg.scrollTop = msg.scrollHeight;
}

addGlobalStyle('#extraLinks:hover #extraLinks_drop {display:block;} #extraLinks #extraLinks_drop {display:none;} #extraLinks_drop span {display:block;}');

var drop, links_box=create('div', {id:'extraLinks',style:'cursor:pointer; font:13px arial tahoma bold; padding:4px; position:fixed; bottom:2px; right:2px; z-index:99999;',kids:new Array(
(drop=create('div', {id:'extraLinks_drop',style:'background:#ffffff; padding:10px 20px 10px 20px; margin-top:2px; border:1px solid #222; -moz-border-radius:4px; z-index:99999;'})),
create("span", {textContent:"» Extra Links", style:"float:right;"})
)});

for(var u in text_and_urls) if(u!="") drop.appendChild(create('span', {style:"padding-left:4px;",kids:new Array(create('a', {textContent:u,href:text_and_urls[u],style:"font-size:11px;font-family:tahoma arial;",onclick:function(e){addLink(e);}}))}));

document.body.appendChild(links_box);

// Auto-Update by sizzlemctwizzle
aaus_38017={
i:'54823', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();