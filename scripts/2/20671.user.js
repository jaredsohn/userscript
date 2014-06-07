// ==UserScript==
// @name           Reddit - downvote upmod requests
// @namespace      http://reddit.com
// @description    Automatically downvotes upmod requests
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @exclude        http://reddit.com/user/*
// @exclude        http://*.reddit.com/user/*
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

var rows;
var matches=0;
rows = document.evaluate("//*[@class='titlerow']", document, null,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

regex = /vote.up.if|up.vote.if|upmod.up.if|up.mod.if/i;
for (var i = 0; i < rows.snapshotLength; i++) {
    var row = rows.snapshotItem(i);
    var text = row.childNodes[0].innerHTML;
    if ( regex.exec(text) ) {
        var storyID = row.id.substr(9);
        var downmod = /downmod/i;
	var upmod = /upmod/i;
        if (!downmod.exec(document.getElementById('down_'+storyID).className) && !upmod.exec(document.getElementById('up_'+storyID).className)) {
            setTimeout("mod('"+storyID+"',0);",5000);
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
