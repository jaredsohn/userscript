// ==UserScript==
// @name           Facebook yoville feed and links
// @namespace      http://www.guia-facebook.com
// @description    facebook yoville feed and links
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @copyright      farmvillept.com
// @copyright      farmvillept.com
// @version        1.1
// @license        free
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////
// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
var links = {

"yoville | " : "http://apps.facebook.com/yoville/index.php",
"Feed | " : "http://www.facebook.com/home.php?filter=app_21526880407&show_hidden=true&ignore_self=true",
"Forum" : "http://www.guia-facebook.com/",
"":"" // Don't change
};
/////////////////////////////////////////////////////////////////////////////




// Get ID
function $(ID) {return document.getElementById(ID);}

// Create
function create(a,b) {
	var ret=document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0 && typeof b[prop]!="string") ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) {
			for(var i=0;i<prop.length;i++) ret.appendChild(prop[i]);
		}
		else if('style,accesskey,id,name,src,href,class,target'.indexOf(prop)!=-1 && typeof b[prop]=="string") ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}  return ret;
}

if(!$("fb_menubar_core") && !$("headNavIn")) return;
var menubar = $("fb_menubar_core"), navSearch = $("headNavIn"), space = / /g;
if(!menubar && navSearch) {
GM_addStyle("#navSearch {margin-left: 190px;}");
menubar = create("div", {style:"padding-top: 5px;"});
navSearch.insertBefore(menubar, navSearch.firstChild.nextSibling);
for(var u in links) {
if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:"color:#FFFFFF; font-weight:bold; font-family: arial, tahoma, verdana, sans-serif; font-size: 12px;", target:"_blank"}));
}
} else {
for(var u in links) {
if(u!="") menubar.appendChild(create("li", {className:"headNavOut", kids:new Array(
create("a", {href:links[u], className:"fb_menu_link", textContent:u, target:"_blank"})
)}));
}
}