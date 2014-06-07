scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Un-safe Search
// @description    Turn safe search off
// @include        http://*.google.*/*
// @exclude        http://*.google.*/*&safe=off*
// @exclude        http://*.google.*/reader/*
// @exclude        http://*.google.*/notebook/*
// @exclude        http://mail.google.com/*
// @exclude        https://mail.google.com/*
// @copyright      JoeSimmons
// @version        1.0.4
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==
]]></>.toString();

if(top && self && top.location!=self.location) return;

// getCookie by JoeSimmons
function getCookie(n) {
var c = document.cookie.match(new RegExp(n+"=([^;]+)"));
return (c?c[1]:null);
}

// setCookie by JoeSimmons
function setCookie(n, v, p, d) {
document.cookie=n+"="+v+(p?";path="+p:"")+(d?";domain="+d:"");
}

// delCookie by JoeSimmons
function delCookie(n, p, d) {
if(getCookie(n)) document.cookie=n+"="+(p?";path="+p:"")+(d?";domain="+d:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

var safe=document.evaluate("//input[@name='safe']",document,null,9,null).singleNodeValue,
	f=document.evaluate("//form[@name='f']",document,null,9,null).singleNodeValue;
if(safe) safe.setAttribute('value', 'off');
	else if(f && !safe) {
	var safeoff = document.createElement('input');
	safeoff.setAttribute('type', 'hidden');
	safeoff.setAttribute('name', 'safe');
	safeoff.setAttribute('value', 'off');
	f.appendChild(safeoff);
	}

// Set safe search by cookie
var pref=getCookie("PREF"), u=pref?pref.replace(/FF=\d:/,"").match(/(^[^:]+:[^:]+:)(.*)/):null, dom=window.location.host.replace(/^[^\.]+/,"");
if(pref && pref.indexOf(":FF=4:")==-1) {
setCookie("PREF", u[1]+"FF=4:"+u[2], "/", dom);
window.location.replace(window.location.href);
}



// Auto update
aaus_38017={
i:'30145', // Script id on Userscripts.org
d:2, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&typeof GM_xmlhttpRequest!='undefined')aaus_38017.ch();