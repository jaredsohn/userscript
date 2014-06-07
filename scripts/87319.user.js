// ==UserScript==
// @name	  CKLinks
// @namespace	  
// @description	  Adds Links to Facebook Header Bar
// @version	  0.0.1
// @include	  http://*.facebook.com/*
// @editor/author	  Pete McDermott (Thanks to JoeSimmons)
// ==/UserScript==

////////////
var links = {



// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
////////////////////////////////////////////////////////////////////////////////
"Farm Town" : "http://apps.facebook.com/farmtown/?ref=bookmarks&cid=bm&count=0",
"F.T.F" : "http://www.facebook.com/group.php?v=wall&gid=317700405142",
"Go Farm ID" : "http://apps.facebook.com/farmtown/play/?farm_id=",
"Requests" : "http://www.facebook.com/reqs.php",
"Notfs" : "http://www.facebook.com/notifications.php",
////////////////////////////////////////////////////////////////////////////////



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

if(!$("fb_menubar_core") && !$("headNavIn")) return;
var menubar = $("fb_menubar_core"), navSearch = $("headNavIn"), space = / /g;
GM_addStyle("#navSearch {width: 20% !important;}"+
			"#navSearch .uiTypeahead .results {position: fixed !important; top: 8% !important; left: 0 !important;}"+
			"#extra_links_holder {margin-left:20% !important; padding-top: 6px !important;}"
			);
menubar = create("div", {id:"extra_links_holder"});
navSearch.insertBefore(menubar, navSearch.nextSibling);
for(var u in links) {
if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:"padding:14px 4px 8px 4px !important; color:#FFFFFF; font-weight:normal; font-family: verdana, tahoma, arial, sans-serif; font-size: 11px;", target:"_parent"}));
}
////////////
