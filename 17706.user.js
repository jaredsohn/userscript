// ==UserScript==
// @name           Reddit User Hater Downvoter
// @namespace      http://nik-martin.com/
// @description    Automatically downvotes all stories submitted by a user, typically reddit spammers
// @include        http://reddit.com/user/*/submitted
// @include        http://*.reddit.com/user/*/submitted
// @exclude        http://reddit.com/info/*
// @exclude        http://*.reddit.com/info/*
// ==/UserScript==

//are we on a users submitted page?
if (! location.href.match(/submitted/)) return;

var downvote = confirm("Downvote this user\'s stories??", "");
if (!downvote)	return;

var rows;
var matches=0;
rows = document.evaluate("//*[@class='titlerow']", document, null,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < rows.snapshotLength; i++) {
    var row = rows.snapshotItem(i);
    var storyID = row.id.substr(9);
    var downmod = /downmod/i;
	 var upmod = /upmod/i;
        if (!downmod.exec(document.getElementById('down_'+storyID).className) && !upmod.exec(document.getElementById('up_'+storyID).className)) {
            setTimeout("mod('"+storyID+"',0);",5000);
            matches+=1;
       	}
  
}

if (matches > 0) {
    var tbl = document.getElementById('siteTable'),
        div = document.createElement('div'),
        msg = 'Downvoted ' + matches + ' stories';
    GM_log(msg);
    if (!tbl) return;
    div.innerHTML = '<p><i>' + msg + ' (Reddit User Hater Downvote Filter).</i></p>';
    tbl.parentNode.insertBefore(div, tbl.nextSibling);
}
