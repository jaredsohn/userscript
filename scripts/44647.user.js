// ==UserScript==
// @name           What.cd? Collapse posts on posts page
// @namespace      http://death2y.uuuq.com/
// @description    Shows only the titles of posts in your posts page
// @include        http*://*what.cd/userhistory.php?*action=posts*
// ==/UserScript==

var tables = document.getElementsByTagName("table")

for (i in tables) {
    tables[i].getElementsByTagName("tr")[1].style.display="none";
}