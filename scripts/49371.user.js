// ==UserScript==
// @name What.CD Logchecker Link
// @description Replaces the "Bookmarks" link at top with link to Better.php
// @version 1.00
// @author Nightgaunt
// @namespace blah
// @include *
// @include *
// ==/UserScript==

// get all the links on the top
var userInfoLinks = document.getElementById('userinfo_minor').getElementsByTagName('a');

// find and replace the link
for(var i=0; i<userInfoLinks.length; i++) {
if (userInfoLinks[i].innerHTML == "Logout") {
userInfoLinks[i].innerHTML = "Better";
userInfoLinks[i].href = "/better.php";
}
}