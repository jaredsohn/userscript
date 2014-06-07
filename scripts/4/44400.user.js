// ==UserScript==
// @name           Tumblr add access keys
// @namespace      http://negativespace.net/msj
// @description    Add access keys to the Tumblr "Next page" and "Previous page" links.
// @include        http://www.tumblr.com/dashboard
// ==/UserScript==


// TODO: make this stuff configurable.
var nextID = "next_page_link";
var nextKey = "m"; // m is closer to the ctrl key on a querty keyboard.

var prevID = "previous_page_link";
var prevKey = "n"; // n won't be used as much, it can be further away from ctrl.

// ------------------------------------- 
// This is where the magic happens.
var nextLink = document.getElementById(nextID);
nextLink.accessKey = nextKey;
nextLink.innerHTML += " [" + nextKey + "]";

var prevLink = document.getElementById(prevID);
prevLink.accessKey = prevKey;
prevLink.innerHTML += " [" + prevKey + "]";
