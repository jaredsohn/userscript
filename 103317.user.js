// ==UserScript==
// @name        MobileMe Dock Badge
// @namespace   http://fluidapp.com
// @description Display a dock badge for MobileMe Mail with the number of unread emails
// @include     *.me.com/mail*
// @author      Nick Freeland (based on Tumblr Dock Badge by Benjamin Stein)
// ==/UserScript==
if (!window.fluid) {
	return;
}

try { 
	doBadgeUpdates(30000);  //check every 30 seconds
} catch(e) { 
	window.console.log(e);
}

function doBadgeUpdates(timeout) {
	//just regex for a digit. easy.
	updateBadge("sc1574-1", /(\d+)/);
	setTimeout(doBadgeUpdates, timeout);	
}

function updateBadge(id, new_post_regex) {
	notice_divs = document.getElementById(id).getElementsByTagName('span');
	if (notice_divs.length > 1) {
		new_post_html = notice_divs[1].innerHTML;
		count = new_post_regex.exec(new_post_html)[0];
		window.fluid.dockBadge = count;
	} else {
		window.fluid.dockBadge = "";
	}
}