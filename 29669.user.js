// ==UserScript==
// @name           Disable "Subscribe to feed page"
// @namespace      http://inodes.org
// @description    Disable "Subscribe to feed page" and display raw XML instead
// ==/UserScript==

/*
  Author: John Ferlito, johnf@inodes.org
  Date:   2008-07-07
*/

// Pick three element ids that appear in the "Subscribe to page" and probably
// nowhere else on the Internet
var tag1 = document.getElementById('feedHeaderContainer');
var tag2 = document.getElementById('feedSubscriptionInfo2');
var tag3 = document.getElementById('feedSubscribeLine');

// Show the source
if (tag1 && tag2 && tag3) {
    location.href = 'view-source:' + document.location.href;
}