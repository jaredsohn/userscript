// ==UserScript==
// @name           BSNude Link Rewriter
// @namespace      http://not.existant
// @description    Rewrites the bsnude.com Image Links
// @version        1.1

// @include       http://www.bsnude.com/*
// ==/UserScript==


// collect all links
var allLinks = document.getElementsByTagName('a');

// walk through the array
for(var i=0; i < allLinks.length; i++) {
    // check if the link href matches pattern
        allLinks[i].href = allLinks[i].href.replace('bsnude.com/cgi-bin/tm3/l?p=90&c=gallery&u=http://www.bsnude.com/top/Picture/picture8564892.cgi?','wowceleb.com/Nude_Celebs8564892/');
}

// that's it!