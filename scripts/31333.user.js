// ==UserScript==
// @name          Youtube Comments In Scrollbox
// @namespace     http://henrik.nyh.se
// @description   Modified version. the older one didnt move it to the right, so i moved the comments closer to the top. Puts YouTube comments in a scrollable box.
// @include       http://*youtube.com/watch?*
// ==/UserScript==



GM_addStyle("#recent_comments, #all_comments { height:200px; overflow-y:auto; margin-bottom:px; }");
GM_addStyle("#watch-actions-area {position:absolute; bottom:295px;; margin-left:500px; width:380px; overflow:hidden;}");
GM_addStyle("#watch-promoted-container{visibility:hidden;}");
GM_addStyle("#watch-rating-div{width:200px; overflow:hidden;}");