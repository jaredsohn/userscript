// ==UserScript==
// @name Kongregate Chat Full Profile Link
// @include http://www.kongregate.com/games/*
// @require http://userscripts.org/scripts/source/49229.user.js
// ==/UserScript==

// Nabb, 3rd May 2009: nabb.trap17.com
// Updated 15th May.

// This script will modify the 'View Profile' link in the user list to open the user's full profile instead of the mini-profile.

setTimeout("nFE('UserRollover.prototype.updateProfileLink','.showProfile(',';window.open(\"http://www.kongregate.com/accounts/\"+')",100)