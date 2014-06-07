// ==UserScript==
// @name           Search Thread button
// @namespace      http://greasemonkey.megagamer.net/
// @include        *facepunch.com/threads/*
// @include        *facepunch.com/showthread.php?*
// ==/UserScript==
if (typeof(google) == 'undefined')
{
    ChromeKludgeSearchButton();
}
else
{
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludgeSearchButton + ')();'));
    document.head.appendChild(script);
}
function ChromeKludgeSearchButton() {
	if (window.location.href.search('/threads/') > 0) {
		var q = document.createElement('span');
		var d = document.createElement('a');
		q.style.float = "right";
		q.style.clear = "none";
		d.textContent = "Search Thread";
		d.href = "/search.php?search_type=1&contenttype=vBForum_Post&searchthreadid="+window.location.href.substr(window.location.href.search('/threads/')+9).split('-')[0];
		q.appendChild(d)
		document.getElementById('subscribe_button').parentNode.appendChild(q);
		document.getElementById('subscribe_button').style.clear = "none";
		document.getElementById('reply_button').style.clear = "none";
	}
}