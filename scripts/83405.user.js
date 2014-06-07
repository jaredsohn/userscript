// ==UserScript==
// @name           wired_full_article
// @namespace      http://www.comedicironpyrite.com/022509.invalid
// @description    Redirects applicable Wired articles to their single page format
// @include        http://www.wired.com/*
// @include        https://www.wired.com/*
// @match          http://www.wired.com/*
// @match          https://www.wired.com/*
// @version        2.2
// ==/UserScript==

/* Written 2010 by Gillemus F/K/A Enidron */
/* 2.0 Updated 2012 thanks to suggestions by geeknik */
/* 2.1 Added @match for Chrome users */
/* 2.2 Updated due to new design of Wired article pages and added https support */

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

var myloc = window.location.href;
var myparam = /all/;
var newloc;

if (document.body.innerText.match("View All")) {
	if (myloc.indexOf(myparam)==-1) {
		var myshortloc = Left (myloc, myloc.indexOf("?"));		
		if (myshortloc.length > 0) {
			newloc = myshortloc + "all/1"; 
		}
		else if (myloc.lastIndexOf("/") == myloc.length-1) {
			newloc = myloc + "all/1";
		}
		else {
			newloc = myloc + "/all/1";
		}
	window.location.replace(newloc);
	}
}