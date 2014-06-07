// ==UserScript==
// @name        What.CD random album link
// @namespace   funeral_meat
// @description Add link to random.php to the top navbar
// @include     http*://*what.cd*
// @version     1
// @grant       none
// ==/UserScript==

document.getElementById("menu").getElementsByTagName("ul")[0].innerHTML += "<li id=\"nav_random\"><a href=\"random.php\">Random</a></li>";