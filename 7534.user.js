// ==UserScript==
// @name          GMail link on Google.com
// @author        Richard Bronosky
// @namespace     http://bronosky.com/pub/greasemonkey_scripts
// @description   When you are logged into gmail, your email address appears on every google.com page, but it does not take you to gmail.  That sucks.  This fixes it.
// @include       http://www.google.com/*
// ==/UserScript==

try{
	var el = (document.body.childNodes[0].firstChild.firstChild.firstChild.textContent.search(/gmail.com$/)!=-1) && 
		document.body.childNodes[0].firstChild.firstChild.firstChild;
} catch(e) {
	try{
		var el = (document.body.childNodes[2].firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.textContent.search(/gmail.com$/)!=-1) && 
			document.body.childNodes[2].firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
	} catch(e) {
		try{
			var el = (document.body.childNodes[1].firstChild.firstChild.textContent.search(/gmail.com$/)!=-1) && 
				document.body.childNodes[1].firstChild.firstChild; 
		} catch(e) {}
	}
}

try{
	if(el){ el.innerHTML="<a href='http://gmail.com'>"+el.textContent+"</a>"; }
} catch(e) {}

//.user.js
