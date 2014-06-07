// ==UserScript==
// @name           Facebook Notification Icon Change
// @description    Notifies the user (for pinned tabs where there's no title) they have a notification by changing the icon color.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

//Code borrowed from FFixer by Vaughan Chandler and Better YTFavico by Mr. Derpison

var favicons = [
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVQ4jWP4//8/AyUYTFhHzjgDxP9JxGeQDSBVMxgTbUBCxer/r999+Q8DJBuArJksA9A10s8AXIBoA0B+R/Y/jD+EwoBoA1yT5v3PbdmCE8MAshhID/UMoDgzUYIBj0Cgi7ar4coAAAAASUVORK5CYII=',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJVJREFUeNpi/P//PwMlgAVEHOeTOAOkjEnUe9by0wsTJijHmAzLwXqYiFHJpafDYHTzAgPQRjBGBkQZoLF6CQO7pATuMCAEYJqBYYUhx8RAIcDrAnT/wvjILsFrwM/nL1C8AOMT7YJz6gYoNsP4VA0D6gQiCw8PA6+hPkHFgrbWcPbn8xep4wJGUG6kJDMxUpqdAQIMALSFL51Ns/sCAAAAAElFTkSuQmCC',
		];

function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

function trim(str) {
    return str.match(/^\W*(.*?)\W*$/)[1];
}

function remove(node) {
    if (node.parentNode)
        node.parentNode.removeChild(node);
}

function processPage() {
var total = 0;

var count = $('//a[@name="mercurymessages"]/span/span', null, true);
if (!count) { count = 0 }
total = total + parseInt(count.innerHTML);
var count = $('//a[@name="requests"]/span/span', null, true);
if (!count) { count = 0 }
total = total + parseInt(count.innerHTML);
var count = $('//a[@name="notifications"]/span/span', null, true);
if (!count) { count = 0 }
total = total + parseInt(count.innerHTML);

if (total > 0) {
total = 1;
}

var head = document.getElementsByTagName('head')[0];
var lns = head.getElementsByTagName('link');

for (var i = 0; i < lns.length; i++) {
    v = lns[i];
    var relval = trim(v.getAttribute('rel'));
    if (relval == 'shortcut icon' || relval == 'icon')
        remove(v);
}
var newln = document.createElement('link');

newln.setAttribute('rel', 'icon');
newln.setAttribute('href', favicons[total]);
head.appendChild(newln);

}
processing = setInterval(processPage, 1000);
processPage();