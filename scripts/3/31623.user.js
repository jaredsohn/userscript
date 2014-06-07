// ==UserScript==
// @name        Tumblr v4 Dock Badge
// @namespace   http://fluidapp.com
// @description Display a dock badge for the Tumblr Dashboard with the number of new posts (works with Tumblr v4)
// @include     *.tumblr.com/dashboard
// @author      Benjamin Stein
// ==/UserScript==
if (!window.fluid) {
	return;
}

try { 
	doBadgeUpdates(60000);
} catch(e) { 
	window.console.log(e);
}
 
/****************
<div id="new_post_notice_container">
<a class="new_post_notice" title="3 new posts" href="/dashboard">
3
<img alt="" src="/images/new_post_alert_arrow.png"/>
</a>
</div>
*************/

function doBadgeUpdates(timeout) {
	//just regex for a digit. easy.
	updateBadge("new_post_notice_container", /(\d+)/);
	setTimeout(doBadgeUpdates, timeout);	
}

function updateBadge(id, new_post_regex) {
	notice_divs = document.getElementById(id).getElementsByTagName('a');
	if (notice_divs.length > 0) {
		new_post_html = notice_divs[0].innerHTML;
		count = new_post_regex.exec(new_post_html)[0];
		window.fluid.dockBadge = count;
	} else {
		window.fluid.dockBadge = "";
	}
}
