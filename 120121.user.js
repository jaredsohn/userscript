// ==UserScript==
// @name          Realign that junk
// @namespace     @chadkello
// @description   This makes Twitter look like the old one with bar on left. follow me: @chadkello
// @include       /^https?://twitter\.com/.*$/
// @version       1
// ==/UserScript==

GM_addStyle(".dashboard { float: right !important; }");
GM_addStyle(".content-main { float: left !important; }");
GM_addStyle(".dashboard .js-items-container .list-link { text-indent: 18px; ");
GM_addStyle(".dashboard .js-items-container .list-link i { -moz-transform: rotate(180deg); left: 10px !important }");

var retweet_cleanse_count = 0;
function retweet_cleanse() {
    var timeline = document.getElementById("timeline");
    var tlen = timeline.childNodes.length;
    for (var e = 0; e < tlen; e++) {
        var et = timeline.childNodes[e];
        if (et.childNodes.length != 5) {              // not a timelinepost
            continue;
        }
        var thumb  = et.childNodes[1];
        var sbody  = et.childNodes[3];
    
        if (sbody.childNodes.length < 15) {           // not a retweet if less
            continue;
        }
        var ricon  = sbody.childNodes[1];
        if (ricon.className != "big-retweet-icon") {  // not a retweet if not a retweet icon
            continue;
        }
        var userstrong = sbody.childNodes[3];
        var entrycontent = sbody.childNodes[7];
        var retweetmeta = sbody.childNodes[11];
    
        var sharedc = retweetmeta.childNodes[1];    
        var retweeta = sharedc.childNodes[1];
    
        var username = retweeta.innerHTML;
        var userhref = retweeta.href;
    
        // repair avatar
        var thumba = thumb.childNodes[0];
        var thumbimg = thumba.childNodes[0];
        thumba.href = userhref;
        thumbimg.src = "http://twivatar.org/" + username;
    
        // repair username
        var usernamea = userstrong.childNodes[0];
        usernamea.title = ""; // dont know
        usernamea.href = userhref;
        var retweetedname = usernamea.innerHTML;
        usernamea.innerHTML = username;
    
        // repair RT text
        entrycontent.innerHTML = "RT @<a href='" + retweetedname + "'>" + retweetedname + "</a>: " + entrycontent.innerHTML;

        // remove big reweet icon
        sbody.removeChild(ricon);

        // i leave the retweeted hover in place, so one can still determine
        // it was a "native" retweed originally, if people request this,
        // this hover can be removed.
    }
    retweet_cleanse_count = tlen;
}

function retweet_cleanse_monitor() {
    if (document.getElementById("timeline").childNodes.length != retweet_cleanse_count) {
       retweet_cleanse();
    }
    setTimeout (retweet_cleanse_monitor, 200);
}

retweet_cleanse();
setTimeout (retweet_cleanse_monitor, 200);