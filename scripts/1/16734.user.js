// ==UserScript==
// @name           reddit hide (Ron Paul)
// @namespace      http://reddit.com
// @description    Automatically hides all Ron Paul stories
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

var rows;
var matches=0;
rows = document.evaluate("//*[@class='titlerow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// cased insensitive
regex1 = /Ron.Paul|Dr[. ]+Paul|Doctor.Paul|Pau1/i;

// case sensitive
regex2 = /RP/;

for (var i = 0; i < rows.snapshotLength; i++) {
	var row = rows.snapshotItem(i);
	var text = row.childNodes[0].innerHTML;
	if (regex1.exec(text) || regex2.exec(text)) {
		row.parentNode.parentNode.parentNode.parentNode.removeChild(row.parentNode.parentNode.parentNode);
		matches+=1;
	}
}

if (matches > 0) {
	var tbl = document.getElementById('siteTable'),
	div = document.createElement('div'),
	msg = 'Removed ' + matches + ' stories';
	GM_log(msg);
	if (!tbl) return;
	div.innerHTML = '<p><i>' + msg + ' (Reddit Content Filter).</i></p>';
	tbl.parentNode.insertBefore(div, tbl.nextSibling);
}