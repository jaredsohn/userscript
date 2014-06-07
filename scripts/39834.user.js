// ==UserScript==
// @name           Reddit - Israel Hide
// @namespace      http://reddit.com
// @description    Automatically hides Israel stories
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// @exclude        http://reddit.com/r/*/comments/*
// @exclude        http://*.reddit.com/r/*/comments/*
// @exclude        http://reddit.com/r/*/related/*
// @exclude        http://*.reddit.com/r/*/related/*
// ==/UserScript==

var rows;
var matches=0;
rows = document.evaluate("//*[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

regex1 = /Israel|Israeli|Israelis|IDF|Gaza|Zionism|Zionists|Zionist|Palestine|Palestinian|Palestinians/i;

for (var i = 0; i < rows.snapshotLength; i++) {
    var row = rows.snapshotItem(i);
    var text = row.childNodes[0].innerHTML;
    if (regex1.exec(text)) {
        var storyID = row.id.substr(9);
        var downmod = /downmod/i;
	var upmod = /upmod/i;
        var hidetimeout = i*250;
  setTimeout("Listing.hide('"+storyID+"');",hidetimeout);
            matches+=1;
    }
}

if (matches > 0) {
    var tbl = document.getElementById('siteTable'),
        div = document.createElement('div'),
        msg = '' + matches + ' "Vote up if" post(s) were removed from this page';
    GM_log(msg);
    if (!tbl) return;
    div.innerHTML = '<p><i>' + msg + ' (Reddit Content Filter).</i></p>';
    tbl.parentNode.insertBefore(div, tbl.nextSibling);
}