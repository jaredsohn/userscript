// Changes builtin Twitter Retweets do standard RT format and shows
// the image of the retweeter instead of the retweeted
// version 0.15
// Copyright (c) 2009, Axel Kittenberger
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Retweet Cleanser", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Retweet Cleanser
// @description   Changes builtin Twitter Retweets do standard RT format and shows the image of the retweeter instead of the retweeted
// @include       http://twitter.com/*
// ==/UserScript==


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

