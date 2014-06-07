// ==UserScript==
// @name       Delete Members NavLink on 7s
// @namespace  http://www.se7ensins.com/forums/members/monopolyman.215986/
// @description Since the Members NavLink doesn't have any purpose I made this to delte it, it also fixes the NavBar for netbook users.
// @include http://www.se7ensins.com/*
// @version    1.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==
var aElem = $ ("a.navLink:contains('Members')");
aElem.text (aElem.remove() )