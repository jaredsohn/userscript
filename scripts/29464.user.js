// ==UserScript==
// @name           https Link Rewriter for Facebook.com
// @namespace      http://not.existant
// @description    Rewrites the facebook.com links to use https. Created by Brian Quan
// @version        1.1
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==



var allLinks = document.getElementsByTagName('a');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('http://www.facebook.com','https://www.facebook.com');
        allLinks[i].href = allLinks[i].href.replace('http://apps.facebook.com','https://apps.facebook.com');
}

var allLinks2 = document.getElementsByTagName('form');

for(var i=0; i < allLinks2.length; i++) {
        allLinks2[i].action = allLinks2[i].action.replace('http://www.facebook.com','https://www.facebook.com');
        allLinks2[i].action = allLinks2[i].action.replace('http://apps.facebook.com','https://apps.facebook.com');
}
