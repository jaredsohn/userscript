// ==UserScript==
// @name        DropDown Links
// @namespace   userscripts
// @description Add own links to topbar
// @include     http://www.neopets.com/*
// @require	http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// My Account (0)

// Customize (1)

// Games (2)

// Explore (3)

// News (4)

// Community (5)
$('.dropdown:eq(5)').append('<li><a href="http://www.neopets.com/neoboards/preferences.phtml">&raquo; Board Preferences</a></li>');

// Shops (6)
$('.dropdown:eq(6)').append('<li><a href="http://www.neopets.com/safetydeposit.phtml">&raquo; SDB</a></li>');

// NC Mall (7)

// Premium (8)