// ==UserScript==
// @name          Flickr Static Bar + Remove Yahoo Bar
// @description   This script makes the Flickr Bar Static and removes the Yahoo User Bar (Based on http://userstyles.org/styles/80069)
// @version       0.2
// @author        Tryn Mirell
// @include       http://flickr.com/*
// @include       https://flickr.com/*
// @include       http://*.flickr.com/*
// @include       https://*.flickr.com/*
// @run-at        document-end
// @updateURL     https://userscripts.org/scripts/source/169920.meta.js
// @namespace     https://mirell.org
// ==/UserScript==

/*global GM_addStyle, PRO_addStyle, addStyle*/
/*jslint newcap: true, browser: true*/

(function() {
    
    "use strict";
    
    var css, node, heads;
    
    css = "#global-nav {position:static !important;}\n" + css;
    css = "#gb-ac-wrap {z-index: 1000 !important;}\n" + css;
    css = "body.new-header {padding:0 !important;}\n" + css;
    
    if (GM_addStyle) {
        GM_addStyle(css);
    } else if (PRO_addStyle) {
        PRO_addStyle(css);
    } else if (addStyle) {
        addStyle(css);
    } else {
        node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
    
    // Remove Yahoo Navigation Bar
    document.body.removeChild(document.getElementById('eyebrow'));
    
    // Remove "with-eyebrow" class from body
    document.body.className = document.body.className.replace("with-eyebrow", "");
    
}());