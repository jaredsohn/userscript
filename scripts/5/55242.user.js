// ==UserScript==
// @name           Self-Post Filter
// @namespace      http://reddit.com
// @description    Automatically hides self-post stories
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// @exclude        http://reddit.com/r/*/related/*
// @exclude        http://*.reddit.com/r/*/related/*
// ==/UserScript==
// Based off of Reddit Content Filter


// Edit this line to include whichever subreddits you want to filter out

var subreggix = /self.(atheism|politics)/i;


var matches=0; 
var xpath = "//p[@class='title']/span[@class='domain']";
var rows = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < rows.snapshotLength; i++) {
	var row = rows.snapshotItem(i);
	var text = row.childNodes[1].innerHTML;
	if (subreggix.exec(text)) {
		row.parentNode.parentNode.parentNode.style.display = 'none';
		matches+=1;
	}
}

if (matches > 0) {
    var tbl = document.getElementById('siteTable'),
        div = document.createElement('div'),
        msg = '' + matches + ' post(s) were removed from this page';
    GM_log(msg);
    if (!tbl) return;
    div.innerHTML = '<p><i>' + msg + ' (Reddit Content Filter).</i></p>';
    tbl.parentNode.insertBefore(div, tbl.nextSibling);
}