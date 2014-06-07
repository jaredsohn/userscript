// ==UserScript==
// @name           Twitter no recommendations
// @namespace      net.prehensileeye.twitter_no_recommendations
// @description    Remove the "Who to follow" section in sidebar
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        1.0
// ==/UserScript==
// Copyright (c) 2010 dcxxcd
// Released under GPLv3
// http://www.gnu.org/copyleft/gpl.htm
(function(){
    xp = "//div[@id='recommended_users']";
    rec_section = document.evaluate(xp, document, null, 
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (rec_section.snapshotLength > 0) {
        r = rec_section.snapshotItem(0);
        p = document.createElement("div");
        p.className = "recommended_users";
        p.appendChild(document.createTextNode(" "));
        r.parentNode.replaceChild(p,r);
    }
})();
