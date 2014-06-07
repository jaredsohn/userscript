// ==UserScript==
// @name           foxNews
// @namespace      http://happyfunball.tv/foxNewsFilter
// @description    blocks sponsored links
// @include        http://www.foxnews.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


jQuery("div.ad").remove();
//alert("first");
//console.log("ready");

// Sneaky trying to use Ajax to inject ads.
jQuery("div.component").bind("DOMSubtreeModified", function() {
    //console.log("DOMSubtreeModified");
    jQuery("div.ad").remove();
});