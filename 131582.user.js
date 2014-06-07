// ==UserScript== 
// @author plasmatic
// @name Remove Reddit Vote Hover
// @namespace http://userscripts.org/ removeredditvotehover/
// @description Removes the annoying upvote and downvote hover text on Reddit
// @include http://*.reddit.com/* 
// ==/UserScript== 

GM_addStyle('.arrow.down:hover:before { display: none !important; } .arrow.up:hover:before { display: none !important; }');
