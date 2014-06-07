// ==UserScript==
// @name        Tumblr Dock Badge
// @namespace   http://fluidapp.com
// @description Display a dock badge for the Tumblr Dashboard with the number of new posts
// @include     *.tumblr.com/dashboard
// @author      Benjamin Stein
// ==/UserScript==
if (!window.fluid) {
	return;
}

try { 
	doBadgeUpdates(60000);  //check every minute
} catch(e) { 
	window.console.log(e);
}
 
 
/****************
<div id="new_posts_notice" style="overflow: visible;">
<div style="padding: 15px 0px 10px;">
<div class="notice">
There is 1 new post.   
<a href="/dashboard">Refresh</a>
to see it.
</div>
</div>
</div>
*************/
// 'There is 1 new post.'
// 'There are 2 new posts.'  

function doBadgeUpdates(timeout) {
	//just regex for a digit. easy.
	updateBadge("new_posts_notice", /(\d+)/);
	setTimeout(doBadgeUpdates, timeout);	
}

function updateBadge(id, new_post_regex) {
	notice_divs = document.getElementById(id).getElementsByTagName('div');
	if (notice_divs.length > 1) {
		new_post_html = notice_divs[1].innerHTML;
		count = new_post_regex.exec(new_post_html)[0];
		window.fluid.dockBadge = count;
	} else {
		window.fluid.dockBadge = "";
	}
}
