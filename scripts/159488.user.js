// ==UserScript==
// @name          Minimalistic Reddit
// @version	      1.2.6
// @namespace     RedBanHammer
// @description	  Make Reddit easier on the eyes. Compatible with RES. Base theme from /r/minimalism.
// @author        RedBanHammer
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @copyright     2013+, RedBanHammer
// @run-at        document-start
// ==/UserScript==

var css = "http://minezmap.com/Reddit/main.min.css";
var icon = "http://minezmap.com/Reddit/icon.png";

var heads = document.getElementsByTagName("head");
var removedCSS = false;

function injectCSS() {
    if (heads.length > 0) {
        var node = document.createElement("link");
        node.setAttribute("rel", "stylesheet")
        node.setAttribute("type", "text/css")
        node.setAttribute("href", css)
        heads[0].appendChild(node); 
    } else {
        console.log("[Minimalistic Reddit] Fatal error! Could not inject CSS on load because no head element was found.");
    }
}

function injectIcon() {
    if (heads.length > 0) {
        var headerLinks = heads[0].getElementsByTagName("link");
        var earlyOut = false;
        
        for (i=0;i<headerLinks.length;i++) {
            l = headerLinks[i];
            if (l.href != icon && l.rel.indexOf("icon") > -1) {
                heads[0].removeChild(l);
            } else if (l.href == icon) {
                earlyOut = true;
            }
        }
        
        if (earlyOut) return;
        
        var node = document.createElement("link");
        node.setAttribute("rel", "shortcut icon")
        node.setAttribute("type", "image/x-icon")
        node.setAttribute("href", icon)
        heads[0].appendChild(node);
    } else {
        console.log("[Minimalistic Reddit] Fatal error! Could not inject favicon on load because no head element was found.");
    }
}

function removeDefaultStyling() {
    if (removedCSS) return;
    var headerLinks = heads[0].getElementsByTagName("link");
    for (i=0;i<headerLinks.length;i++) {
        l = headerLinks[i];
        if (l.title == "applied_subreddit_stylesheet") {
            heads[0].removeChild(l);
            removedCSS = true;
        }
    }
}

injectCSS();
for (i=-1;i<7;i++) {
    var f = function() {
        injectIcon();
        removeDefaultStyling();                
    };
    unsafeWindow.setTimeout(f, 100*Math.pow(2, i-1));
}