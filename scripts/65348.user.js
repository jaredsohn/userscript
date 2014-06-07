// ==UserScript==
// @name            GLB User Posts Link - Unlimited
// @namespace       GLB
// @description			Adds a link below users names in the forum to search for their posts
// @include         http://goallineblitz.com/game/forum_thread.pl*
// ==/UserScript==
function pl() {
re(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<div class="user_name">(.*)>(.*)<\/a>/gi,'<div class="user_name">$1>$2</a><br><a href="/game/search_forum.pl?user_name=$2&age=9999&forum_id=0&action=Search" style="color:green; font-size:90%">Posts</a>',null);
}; 
window.addEventListener("load", function() { pl() }, false);

function re(doc, element, mr, rs) {
    mr = new RegExp(mr);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(mr, rs);
    };
};