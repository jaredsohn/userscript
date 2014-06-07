// ==UserScript==
// @name        WhoSay Sign-In Popup Blocker
// @namespace   http://userscripts.org/users/49075
// @description Blocks the sign-in modal popup on WhoSay
// @include     http://www.whosay.com/
// @version     1
// @grant       none
// ==/UserScript==

jQuery('body').bind('DOMNodeInserted', function() {
    jQuery('.sign-in-overlay').parents('.overlay').remove();
});