// ==UserScript==
// @name           Reddit submissions from past 6 hours
// @namespace      zaken
// @description    Only displays submissions from the past 6 hours when sorted by top
// @include        http://www.reddit.com*/top/*
// ==/UserScript==

var links = document.getElementsByClassName("link");

for (i=0;i < links.length; i++) {
    var link = links[i]
    linkHtml = link.getElementsByClassName("tagline")[0].innerHTML
    time = linkHtml.split(" ",3);
    if (time[0] == "submitted" && time[2] == "hours" && parseInt(time[1]) < 6) {
        // leave it alone
    } else {
        link.parentNode.removeChild(link);
        i --;
    }
}
