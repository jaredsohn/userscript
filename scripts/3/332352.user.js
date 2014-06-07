// ==UserScript==
// @name        Giant Bomb REALLY important
// @namespace   http://userscripts.org/users/116993
// @description Makes the Giant Bomb chat important banner REALLY important.
// @include     http://www.giantbomb.com/chat/
// @version     1
// @grant       none
// ==/UserScript==

var marquee = document.createElement("marquee");
var banner = document.getElementById("importantBanner");
banner.style.color = "#F00";

banner.parentNode.insertBefore(marquee, banner);
marquee.appendChild(banner);

setInterval(function () {
    marquee.style.visibility = marquee.style.visibility == 'visible' ? 'hidden' : 'visible';
}, 500);
