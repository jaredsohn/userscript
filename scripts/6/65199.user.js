// ==UserScript==
// @name           Facebook Ignore All Requests
// @namespace      http://userscripts.org/users/23652
// @description    Denies all facebook requests on button click
// @include        http://*.facebook.com/*
// @copyright      Abishek
// @version        1.0.4
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://gmconfig.googlecode.com/svn/trunk/fb_gm_frame.js
// @require        http://userscripts.org/scripts/source/51532.user.js
// ==/UserScript==

// Created by Abishek
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

function ignoreall() {
var array=document.evaluate("//input[@value='Ignore' and @type='submit']",document,null,6,null), max=array.snapshotLength<10?array.snapshotLength:10;
for(var i=0; i<max; i++) if(array.snapshotItem(i).offsetHeight>0) array.snapshotItem(i).click();
if(max==10) setTimeout(ignoreall, 3500+Math.round(Math.random()*500));
}

function fbPageChanged() {
if(GM_testUrl(['http://www.facebook.com/reqs.php*']) && !$g("#ignoreall")) {
document.body.appendChild(create('input', {type:'button',value:'Ignore All',id:"ignoreall",onclick:ignoreall,style:"position:fixed; bottom:32px; right:14px;"}));
}
}