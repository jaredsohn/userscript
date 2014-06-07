// ==UserScript==
// @name           user2cat
// @description    user2cat
// @author         v.shatsky
// @license        MIT
// @version        0.2
// @include        https://support.magneticone.com/*
// @icon           https://support.magneticone.com/favicon.ico
// ==/UserScript==


var badges = document.getElementsByClassName('ticketpostbarbadgeblue');

for (var i = badges.length - 1; i >= 0; i--) {
    if (!badges[i].nextSibling) {
        var avatar = document.createElement("div");
        avatar.className = "ticketpostavatar";
        avatar.innerHTML = '<div class="tpavatar"><img src="http://support.magneticone.com/geckoboard/cat.php" align="absmiddle" border="0"></div>';
        badges[i].parentNode.appendChild(avatar);
    }
};

