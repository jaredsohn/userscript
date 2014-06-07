// ==UserScript==
// @name              Facebook - Extra link"
// @namespace     http://userscripts.org/users/107131
// @description     Yes i do
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
/////////////////////////////////////////////////////////////////////////////
// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
var links = {
"SR" : "http://facebook3.streetracing.zynga.com/track.php?{*u_id*}&zcode={*ZT_CODE*}&code=11&value=feed_fbprofilebox_al&next=index",
"MW" : "http://apps.facebook.com/inthemafia/links.php?zy_link=profilebox&zy_track=profilebox&fb_sig_added=1&from=1417833093",
"Blogku" : "http://rezarezong.blogspot.com",

"":"" // Don't change
};
/////////////////////////////////////////////////////////////////////////////




// Get ID
function $(ID) {return document.getElementById(ID);}

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

if(!$("fb_menubar_core")) return;
var menubar = $("fb_menubar_core"),
	space = / /g;
for(var u in links) {
if(u!="") menubar.appendChild(create('li', {id:'extraLinks_'+u.replace(space,"_").toLowerCase(),className:'fb_menu',kids:new Array(create('a', {href:links[u],textContent:u,className:'fb_menu_link'}))}));
}