// ==UserScript==
// @name           Facebook Reload Button
// @namespace      http://userscripts.org/users/69391
// @description    Adds a reload button next to the inbox on Facebook pages
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com*
// @include        http://apps.new.facebook.com*
// ==/UserScript==

// v1.02 by K. Hampf<khampf@users.sourceforge.net>
// I wrote this because if you click the browser-reload button it does just
// that, reloads the page along with images etc. But I just want to update
// the page, clicking this button just changes the URL to ... the same URL
// and does sort of a "soft" reload on the page.
 
function insertAfter(newNode, node) {
	if (node.nextSibling) // does next sibling exist? If so, insert before
		node.parentNode.insertBefore(newNode, node.nextSibling);
	else node.parentNode.appendChild(newNode);		// if not, append last
}

try {
	var fbdiv = document.getElementById('fb_menubar_aux');
	if (fbdiv) {
		var reloadDiv = document.createElement('div');
		reloadDiv.setAttribute('id','fb_reload');
		reloadDiv.style.margin = "5px";
		reloadDiv.innerHTML = "<input id=\"fb_reload_button\" type=\"button\" value=\"refresh\" onclick=\"window.location.href=window.location.href\"></input>";
		insertAfter(reloadDiv, fbdiv);
		
	}
} catch (err) { GM_log("Error: " + err); }
