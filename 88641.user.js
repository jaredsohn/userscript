// ==UserScript==
// @name           Facebook Oyun Linkleri
// @namespace      http://userscripts.org/users/23652
// @description    Adds extra links at the top of facebook; customizable
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @copyright      MsNKoPaTCoCuK
// @version        1.0.0
// @license        Oyunlara Anında Erişin :)
// ==/UserScript==

var links = {



// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
/////////////////////////////////////////////////////////////////////////////
"Oyunlar" : "http://www.facebook.com/?sk=games&ap=1",
"Milyoner City" : "http://apps.facebook.com/millionairecity",
"Wild Ones" : "http://apps.facebook.com/wildones/",
/////////////////////////////////////////////////////////////////////////////



"":"" // Don't change
};




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

if(!$("headNav")) return;
var navSearch = $("headNav"), space = / /g;
menubar = create("div", {id:"extra_links_holder", class:"lfloat", style:"border: 0px solid black; padding-top: 8px;"});
for(var u in links) if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:"padding:14px 4px 8px 4px !important; color:#FFFFFF; font-weight:normal; font-family: verdana, tahoma, arial, sans-serif; font-size: 11px;", target:"_parent"}));
navSearch.insertBefore(menubar, navSearch.nextSibling);