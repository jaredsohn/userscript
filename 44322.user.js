// ==UserScript==
// @name          Hide Twitter Stats
// @namespace     http://www.keyes.ie/greasemonkey
// @description   Do you hate Twitter stats? This will remove them for you.
// @include       http://twitter.com/*
// @version       1.1
// ==/UserScript==

// Version 1.1 - March 16th, 2009
//  * hide it on all pages not just the home page
//  * leave the links, just hide the numbers
//
// Version 1 - March 16th, 2009

var remove = function(elem_id) {
    var elem = document.getElementById(elem_id);
    var parentNode = elem.parentNode;
    parentNode.removeChild(elem);
    var brs = parentNode.getElementsByTagName("br");
    parentNode.removeChild(brs[0]);
}

remove("following_count");
remove("follower_count");
remove("update_count");
