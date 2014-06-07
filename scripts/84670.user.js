// ==UserScript==

// @name           Antisocial web

// @namespace      http://userscripts.org/users/164132

// @description    Remove the blight of mass comment threads from big sites.

// @include        http://www.guardian.co.uk/*

// @include        http://www.bbc.co.uk/blogs/*

// @include        http://www.youtube.com/*

// ==/UserScript==



var ids = ["comments", "watch-discussion", "discussion-comments", "pluck-comment-block"];

var ix;

var c;

for (ix in ids) {

    c = document.getElementById(ids[ix]);

    if (c) {break;}

}

c.style.display = "None";