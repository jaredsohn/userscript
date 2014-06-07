// ==UserScript==
// @name       YT Hide Namechange question
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Hides the annoying question by Youtube if you want to change your name and whatnot.
// @match      http://*.youtube.com/*
// @copyright  2012+, Tom (5xt)
// ==/UserScript==

// If anything hides not the way it should or the video stops playing because of the question still appearing, please PM me on YouTube to the name 5xt, or post a bug report.

document.getElementById("link-gplus-lb").innerHTML = "";
document.getElementById("yt-dialog-bg").innerHTML = "";