// ==UserScript==
// @name           subreddit stylesheet enforcer
// @namespace      http://reddit.com
// @description    add a subreddit's stylesheet if it's missing (because an external domain was defined for it)
// @include        http://www.reddit.com/r/*
// ==/UserScript==

// make sure the page is loaded enough to have some stylesheet of its own
var links = document.getElementsByTagName("link");
if (links.length>0) {
    // extract subreddit from URL
    var subreddit = location.pathname.substring(3).split("/")[0].split("?")[0];
    // generate stylesheet URL
    var css = "http://www.reddit.com/r/"+subreddit+"/stylesheet.css";
    
    // loop through each link tag, making sure we don't already have that stylesheet
    var found = false;
    for (var i=0;i<links.length;i++) {
        var link = links[i];
        var url = links[i].href;
        if (url.indexOf(css)===0) {
            found = true;
            break;
        }
    }
    if (!found) {
        // inject stylesheet in document
        var tag = document.createElement("link");
        link.rel="stylesheet";
        link.type="text/css";
        link.title="applied_subreddit_stylesheet";
        // unnecessarily complex cache buster, to fit in.
        link.href=css+"?"+Math.floor(Math.random()*1e18).toString(16)+Math.floor(Math.random()*1e18).toString(16);
        document.getElementsByTagName("head")[0].appendChild(tag);
    }
}