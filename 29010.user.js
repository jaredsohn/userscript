// ==UserScript==
// @name           liveleak.user.js
// @namespace      mccrew.com
// @include        http://*.liveleak.com/*
// ==/UserScript==


// Remove that annoying, and often NSFW, <DIV id="j_ad"> ...

var rxSearchId = "j_ad";
var node = document.getElementById(rxSearchId);

if (node && node.parentNode)
{
    //GM_log ("removing offending node");
    node.parentNode.removeChild(node);
}
/*else
    GM_log ("NOT removing offending node");
*/
