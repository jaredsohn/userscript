// ==UserScript==
// @name           Gravatar Linkify
// @namespace      http://userscripts.org/users/23652
// @description    Converts Gravatars to the biggest size, and creates a link to it
// @include        http://*
// @include        https://*
// @include        file:///*
// @exclude        http://*gravatar.com/*
// @copyright      JoeSimmons
// @version        1.0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// Use local functions and support Opera
(function(){

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

var gravs = document.evaluate("//img[contains(@src, 'avatar.php?gravatar_id=')]",document,null,6,null),
	regex = /\&s=\d+/, src='';

for(var i=gravs.snapshotLength-1,g; (g=gravs.snapshotItem(i)); i--) {
if(g.parentNode.tagName!='A') {
src = g.src;
g.parentNode.replaceChild(create('a', {href:src.replace(regex,'&s=512'), kids:new Array(
create('img', {src:src, width:g.width, height:g.height})
)}), g);
}
}

})();