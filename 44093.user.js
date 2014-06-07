// ==UserScript==
// @name           https Link Rewriter for identi.ca
// @namespace      http://identi.ca/
// @description    Rewrites the identi.ca links to use https.
// @version        1.2
// @include       http://identi.ca/*
// @include       https://identi.ca/*
// ==/UserScript==

//redirect to https
if (document.location.protocol != "https:")
{
document.location.href = "https://identi.ca" + document.location.pathname;
};

//rewrite links to https
var allLinks = document.getElementsByTagName('a');

for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('http://identi.ca','https://identi.ca');
}

var allLinks2 = document.getElementsByTagName('form');

for(var i=0; i < allLinks2.length; i++) {
        allLinks2[i].action = allLinks2[i].action.replace('http://identi.ca','https://identi.ca');
}