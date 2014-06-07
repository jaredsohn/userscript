// ==UserScript==
// @name           Follow reddit story link
// @namespace      http://userscripts.org/users/83627
// @include        http://www.reddit.com/r/*/comments/*
// @include        http://reddit.com/r/*/comments/*
// @author         Hunter Fuller
// @homepage       http://hackmiester.com
// ==/UserScript==

var e = Array.filter( document.getElementById('siteTable').getElementsByClassName('title'), function(elem) {
	return elem.nodeName == 'A';
}
);

var c_name = "rdlf_hack_cookie" 

c_start=document.cookie.indexOf( c_name + "=");
if (c_start!=-1)
{ 
	c_start=c_start + c_name.length+1; 
	c_end=document.cookie.indexOf(";",c_start);
	if (c_end==-1) c_end=document.cookie.length;
	var c = unescape(document.cookie.substring(c_start,c_end));
} else {
	var c = "";
}

if ( c != document.location) {
	document.cookie = c_name + "=" + escape(document.location);
	window.location = e;
}
