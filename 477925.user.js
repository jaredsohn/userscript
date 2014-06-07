// ==UserScript==
// @name           MobyGames Approval Link Editor
// @namespace      http://sopoforic.wordpress.com/
// @description    When no approval notifications exist, link to info screen.
// @version        0.1.0
// @copyright      2014+, Tracy Poff (http://sopoforic.wordpress.com/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        *.mobygames.com/*
// @grant          none
// @downloadURL    http://userscripts.org/scripts/source/477925.user.js
// ==/UserScript==

var button = document.querySelector("div.navbar-right:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(3)");

if (button.innerHTML == "<span class=\"glyphicon glyphicon-warning-sign\"></span> 0") {
    button.href = "http://www.mobygames.com/user/sheet/view/approvals";
}
