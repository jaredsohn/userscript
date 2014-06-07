// ==UserScript==
// @name           https Link Rewriter for twitter.com
// @namespace      twitter.com
// @description    twitter https-rewrite and redirect script
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

//redirect to https
if (document.location.protocol != "https:")
{
    document.location.href = "https://twitter.com" + document.location.pathname;
};

//rewrite links to https
var allLinks = document.getElementsByTagName('a');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('http://twitter.com','https://twitter.com');
}

var allLinks2 = document.getElementsByTagName('form');

for(var i=0; i < allLinks2.length; i++) {
        allLinks2[i].action = allLinks2[i].action.replace('http://twitter.com','https://twitter.com');
}