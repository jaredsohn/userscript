// ==UserScript==
// @name           Facebook Friends Links
// @description    Adds links to a list of your all your friends and requests next to the search bar.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @copyright      ElasticTheads
// @version        0.8
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////
// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
var links = {
"Friends" : "http://www.facebook.com/friends/?filter=ac",
"Requests" : "http://www.facebook.com/reqs.php",

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
GM_addStyle("#navSearch {}");
menubar = create("div", {});
navSearch.insertBefore(menubar, navSearch.firstChild.nextSibling);
for(var u in links) {
if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:"position:relative;left:315px;top:8px;padding:16px; color:#FFFFFF; font-weight:bold; font-family: arial, tahoma, verdana, sans-serif; font-size: 12px;", target:"_parent"}));
}
} else {
for(var u in links) {
if(u!="") menubar.appendChild(create("li", {className:"fb_menu", kids:new Array(
create("a", {href:links[u], className:"fb_menu_link", textContent:u, target:"_parent"})
)}));
}
}