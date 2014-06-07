// ==UserScript==
// @name           KOC Executor
// @version        1.0.0.20130315
// @namespace      http://userscripts.org/users/ogradyjd
// @downloadURL    http://userscripts.org/scripts/show/162057
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include        *facebook.com/dialog/feed*
// ==/UserScript==
alert('Found it!');
var meTabsElmt = jQuery('#main_engagement_tabs');
if(meTabsElmt.length<1) {
    alert('main_engagement_tabs not found');
} else {
    alert('adding new div');
    meTabsElmt.before('<div>HELLO!!!</div>');
}