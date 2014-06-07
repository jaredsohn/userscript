// ==UserScript==
// @name           FB Feed Bar
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        https://apps.facebook.com/*
// @copyright      Drzoolittle
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var links = {



// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
/////////////////////////////////////////////////////////////////////////////

"Games" : "http://www.facebook.com/?sk=cg",
"Zoo" : "http://www.facebook.com/?sk=app_167746316127",
"Zoo-Classic" : "http://www.facebook.com/?sk=app_148662968522174",
"Farmville" : "http://www.facebook.com/?sk=app_102452128776",
"Animal-Kingdom" : "http://www.facebook.com/?sk=app_183335491746626",
"Hidden-Chronicles" : "http://www.facebook.com/?sk=app_100333333405439",
"Status" : "http://www.facebook.com/?sk=app_2915120374",
"Photos" : "http://www.facebook.com/?sk=app_2305272732_2392950137",

/////////////////////////////////////////////////////////////////////////////



"":"" // Don't change
};




// Get ID
function $(ID) {return document.getElementById(ID);}

// Create by avg, modified by Drzoo little
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
var navSearch = $("headNav"), space = / /g,
	menubar = create("div", {id:"extra_links_holder", class:"lfloat", style:"background-color: #3B5998;"});
for(var u in links) {
	if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:"padding:14px 4px 8px 20px !important; color:#D8DFEA; font-weight:bold; font-family: verdana, tahoma, arial black, sans-serif; font-size: 11px;", target:"_parent"}));
}
navSearch.insertBefore(menubar, navSearch.nextSibling);