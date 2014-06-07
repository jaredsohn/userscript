// ==UserScript==
// @name        Exceptional Dock Badge
// @namespace   http://fluidapp.com
// @description Display a dock badge for Exceptional
// @include     *.exceptional.com/apps/*
// @author      Benjamin Stein ben@benjaminste.in
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
<div class="dropdown" id="state-switcher">
  <a href="/apps/11598/exceptions?state=open" class="open" data-param="open">Open (<span class="count">14</span>)</a>
*************/

function doBadgeUpdates(timeout) {
	//just regex for a digit. easy.
	updateBadge("state-switcher", /(\d+)/);
	setTimeout(doBadgeUpdates, timeout);	
}

function updateBadge(id, exception_count_regex) {
	notice_divs = document.getElementById(id).getElementsByTagName('a');
	if (notice_divs.length > 0) {
		exception_count_html = notice_divs[0].innerHTML;
		count = exception_count_regex.exec(exception_count_html)[0];
		window.fluid.dockBadge = (count=='0' ? '' : count);
	} else {
		window.fluid.dockBadge = "";
	}
}
