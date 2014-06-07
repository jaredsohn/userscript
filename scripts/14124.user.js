// ==UserScript==
// @name          YouTube Comments Next to Video
// @namespace     http://henrik.nyh.se
// @description   Fixed version of UserScripts.org user Henrik N. Puts YouTube comments in a scrollable box on the right side of the video so that you can read them without scrolling away from the clip, similar to Google Video. Works with Youtube Beta page.
// @include       http://*youtube.com/watch?*
// ==/UserScript==

var div = document.getElementById('actionsAndStatsDiv');
var text = div.textContent.match(/Comments:\s+\d+/);
if( text && text[0] && text[0].match(/\d+/)[0]=='0' ){
return;
}

GM_addStyle("#recent_comments, #all_comments { height:200px; overflow-y:auto; margin-bottom:15px; }");

var a = $('channelVidsDiv');
var c = $('recent_comments');
var c2 = $('all_comments');
var d = $('commentsDiv');

if (!c && !c2) return;

a.parentNode.insertBefore((c || c2), a.nextSibling);

d.getElementsByTagName("h2")[0].innerHTML = "Comments ↗ and responses ↓";

function $(id) { return document.getElementById(id); }