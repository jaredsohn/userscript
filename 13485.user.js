// ==UserScript==
// @name           Yahoo Fantasy Sports Move Home Link
// @description    Move Home link to end of navigation
// @include        http://*football.fantasysports.yahoo.com/f*
// @include        http://*basketball.fantasysports.yahoo.com/*
// ==/UserScript==

// Yahoo added a "Home" link to the beginning of the navigation bar.  For
// those who were used to clicking in a certain spot and not really paying
// attention to what the link was, it became quite annoying.  This moves the
// "Home" link to the end of the Navigation bar, before "Launch StatTracker".
// I didn't want to just remove "Home" because there is good info on that page.

var yspNav;
var yspNavUL;
var lis;
var homeNode;

// Get the button bar identified by yspnav.
yspNav = document.getElementById('yspnav');

// Get the first (and should be only) UL tag in yspnav.
yspNavUL = yspNav.getElementsByTagName('ul')[0];

// Get the LI tags in the UL tag we got above.
lis = yspNavUL.getElementsByTagName('li');

// Retrieve the first LI (Home), and remove the class.
homeNode = lis[0];
homeNode.removeAttribute('class');

// Insert the "Home" link before "Launch StatTracker".
yspNavUL.insertBefore(homeNode, lis[lis.length-1]);
