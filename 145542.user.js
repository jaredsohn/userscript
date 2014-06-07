// ==UserScript==
// @name          Sub-URL Redirector
// @description   Redirect to Sub-URL inside of Master URL
// @author        anon12010
// @version       1010
// @updateURL     https://userscripts.org/scripts/source/145542.user.js
// @grant         none
// @exclude       *
// ==/UserScript==

var pg = window.location.href;
function gotopage (inspace) {
	var r=confirm("	Hidden URL Detected.\nRedirect to '"+pg.substring(inspace)+"' ?")
	if (r) {
		window.location = pg.substring(inspace);
	}
}
if (pg.indexOf("=http://") >= 0) {
    gotopage(pg.indexOf("=http://")+1);
} else if (pg.indexOf("/http://") >= 0) {
	gotopage(pg.indexOf("/http://")+1);
} else if (pg.indexOf("?http://") >= 0) {
	gotopage(pg.indexOf("?http://")+1);
}