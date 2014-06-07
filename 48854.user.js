// ==UserScript==
// @name           https Link Rewriter for hi5.com
// @namespace      http://not.existant
// @description    Rewrites the hi5.com links to use https. Created by Jbyte
// @version        1.1
// @include       http://*.hi5.com/*
// @include       https://*.hi5.com/*
// ==/UserScript==



var allLinks = document.getElementsByTagName('a');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('http://www.hi5.com','https://www.hi5.com');
        
}

var allLinks2 = document.getElementsByTagName('form');

for(var i=0; i < allLinks2.length; i++) {
        allLinks2[i].action = allLinks2[i].action.replace('http://www.hi5.com','https://www.hi5.com');
        
}
