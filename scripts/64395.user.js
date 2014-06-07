// ==UserScript==
// @name           Reddit Auto downvote users
// @namespace      http://reddit.com
// @description    Automatically downvotes and hides certain submitters. Modified from http://userscripts.org/scripts/show/35713 - Thanks itsnotlupus
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

var rows;
var matches=0;
rows = document.evaluate("//*[@class='author']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Users to mod, using regular expressions. Reddit-man as an example
regex1 = /reddit\-man|hhrapinfo|frnknglsh|stonecoldq|evil_twin|/i;

for (var i = 0; i < rows.snapshotLength; i++) {
    var row = rows.snapshotItem(i);
    var text = row.innerHTML;
      if (regex1.exec(text)) {
        var storyID = row.id.substr(7);
        var downmod = /downmod/i;
	var upmod = /upmod/i;
        if (!downmod.exec(document.getElementById('down_'+storyID).className) && !upmod.exec(document.getElementById('up_'+storyID).className)) {
            setTimeout("mod('"+storyID+"',0);",100);
            setTimeout("Listing.hide('"+storyID+"');",200);
            matches+=1;
        }
    }
}

if (matches > 0) {
    var tbl = document.getElementById('siteTable'),
        div = document.createElement('div'),
        msg = 'Downvoted ' + matches + ' stories';
    GM_log(msg);
    if (!tbl) return;
    div.innerHTML = '<p><i>' + msg + ' (Reddit Content Filter).</i></p>';
    tbl.parentNode.insertBefore(div, tbl.nextSibling);
}