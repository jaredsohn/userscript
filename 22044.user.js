// ==UserScript==
// @name           Access Keys for Trac
// @namespace      trac-ticket-access
// @description    Adds accesskey for next and previous ticket links
// @include        http://trac.edgewall.org/ticket/*
// ==/UserScript==

// Change or add URLs to add access keys to the trac installation of your choice

var allAnchors;
allAnchors = document.getElementsByTagName('a');
links = {
    "Next Ticket": "n",
    "Previous Ticket": "p",
    "Back to Query": "q"
   }

var totalKeys = 0;
for (l in links) {
    totalKeys++
}

var keysFound = 0;


for (var i in allAnchors) {
    for (key in links) {
        if (allAnchors[i].text == key) {
            allAnchors[i].setAttribute("accesskey", links[key]);
            keysFound++;
            break;
        }
    }
    
    if (keysFound >= totalKeys) {
        break;
    }
}
GM_log("Total anchors checked: " + i)