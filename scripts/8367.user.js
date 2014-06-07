// ==UserScript==
// @name          w3schools google results cleaner 
// @namespace     http://breasy.com/blog/files/w3SchoolsRemover.user.js
// @description	  Removes w3schools links from Google results pages because they suck, yet are highly ranked
// @include       *google*/search*
// ==/UserScript==

// Last modified: 2007-04-06


var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    link = links[i];
    if (link.className == 'l') {
        if (link.href.indexOf('w3schools') != -1) {
            //find the appropriate parent
            el = link
            while (el.className != 'g') {
                el = el.parentNode;
            }
            el.style.display = "none";
        }
    }
}