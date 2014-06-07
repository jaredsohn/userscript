// ==UserScript==
// @name          YouTube comments next to videos
// @namespace     http://henrik.nyh.se
// @description   Puts YouTube comments in a scrollable box on the right side of the video so that you can read them without scrolling away from the clip, similar to Google Video.
// @include       http://*youtube.com/watch?*
// ==/UserScript==

GM_addStyle("#recent_comments, #all_comments { height:200px; overflow-y:auto; margin-bottom:15px; }");

var a = $('aboutVidDiv');
var c = $('recent_comments');
var c2 = $('all_comments');
var d = $('commentsDiv');

if (!c && !c2) return;

a.parentNode.insertBefore((c || c2), a.nextSibling);

d.getElementsByTagName("h2")[0].innerHTML = "Comments ↗ and responses ↓";

function $(id) { return document.getElementById(id); }
