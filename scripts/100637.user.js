// ==UserScript==
// @name          YouTube Auto Wide
// @description   Automatically plays YouTube videos in wide format.
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @version       0.2
// @date 2013-01-11
// @updateURL https://userscripts.org/scripts/source/100637.meta.js
// ==/UserScript==
var yt = yt;
yt = yt || {};
yt.playerConfig = {"player_wide": 1};
document.cookie = "wide=1; domain=.youtube.com";
function $(a) {return document.getElementById(a);}
$("watch7-container").className = "watch-wide";
