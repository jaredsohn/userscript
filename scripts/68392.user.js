// ==UserScript==
// @name           Facebook mafiawars Links
// @namespace      http://www.guia-facebook.com
// @description    facebook mafiawars links
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @copyright      http://www.guia-facebook.com
// @version        1.3
// @license        free use
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////
// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
var links = {

"Mafiawars" : "http://apps.facebook.com/inthemafia/?zy_link=appage",
"Requests" : "http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true&ignore_self=true",
"Blog" : "http://www.guia-facebook.com",
"":"" // Don't change
};
/////////////////////////////////////////////////////////////////////////////




// Get ID
function $(ID) {return document.getElementById(ID);}

// Create by avg, modified by JoeSimmons
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
GM_addStyle("#navSearch {margin-left: 250px;}");
menubar = create("div", {});
navSearch.insertBefore(menubar, navSearch.firstChild.nextSibling);
for(var u in links) {
if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:" padding:16px; color:#FFFFFF; font-weight:bold; font-family: arial, tahoma, verdana, sans-serif; font-size: 12px;", target:"_blank"}));
}
} else {
for(var u in links) {
if(u!="") menubar.appendChild(create("li", {className:"fb_menu", kids:new Array(
create("a", {href:links[u], className:"fb_menu_link", textContent:u, target:"_blank"})
)}));
}
}