// ==UserScript==

// @name           subredditpanel_minimize
// @namespace      subredditpanel_minimize
// @include        http://www.reddit.com/*
// ==/UserScript==

// DETAILS

// This script allows reddit users to minimize and maximize the subreddit panel on the main page. It's a bit rough, but it works well.


if (location.href.match('^(http:\/\/)?(www\.)?reddit\.com(\/|\/([^r].*))?$')) {

els = document.getElementsByTagName('*');
elsLen = els.length;
for (i = 0; i < elsLen; i++) {
	if (els[i].className == 'subredditbox') {
		break;
	}
}

red_custom_elem = els[i]
red_custom_html = red_custom_elem.innerHTML
red_custom_html = red_custom_html.replace('Customize your reddit', 'Customize your reddit <a id="reddit_custom_min" href="" onclick="return false;">[-]</a>')

function red_custom_min() {
	red_custom_elem.innerHTML = '<a href="" id="reddit_custom_max" onclick="return false;" >customize your reddit [+]</a>';
	document.getElementById('reddit_custom_max').addEventListener('click', red_custom_max, true);
	GM_setValue('red_min', true);
}

function red_custom_max() {
	red_custom_elem.innerHTML = red_custom_html;
	document.getElementById('reddit_custom_min').addEventListener('click', red_custom_min, true);
	GM_setValue('red_min', false);
}

if (GM_getValue('red_min', false)) {
	red_custom_min();
}
else {
	red_custom_max();
}

}
