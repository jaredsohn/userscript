// ==UserScript==

// @name YouTubeUploadsOnly

// @namespace http://www.flickr.com/icebone

// @description Change YouTube home link to uploads only

// @include *youtube.com*

// @grant none

// @version      0.0.3

// ==/UserScript==


var targID      = "logo-container";
var targLink    = document.querySelector ("#" + targID);
targLink.href  +="feed/subscriptions";