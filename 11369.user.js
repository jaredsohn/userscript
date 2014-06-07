 // ==UserScript==
 // @name           Highlight Ads in facebook Feed
 // @namespace      http://www.henrybridge.com/
 // @description    Adds a background for ads embedded in the facebook feed so you don't mistake them for *real* content
 // @include        http*://*.facebook.com/*
 // ==/UserScript==

 window.addEventListener("load", function() {
        addGlobalStylesheet("DIV.ad_capsule {background-color:#d5dff3 !important;}"
        );
 }, true);

 function addGlobalStylesheet(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
       var style = document.createElement('style');
       style.type = 'text/css';
       style.innerHTML = css;
       head.appendChild(style);
    }
 }