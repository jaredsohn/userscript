// ==UserScript==
// @name          Battle.net WoW Forums - Improved Readability for Chrome
// @namespace     http://userscripts.org/users/246068
// @description   Change new WoW forum text for higher contrast and slightly larger font size in Google Chrome
// @copyright     2010
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       1.01
//
// @include  http://us.battle.net/wow/en/forum/*
// @match    http://us.battle.net/wow/en/forum/*
// ==/UserScript==

/* My eyes! The forums do nothing! */
var style = "body { color: white; font-size:14px; }";

var head = document.getElementsByTagName('head')[0];
if (!head) return;
var node = document.createElement("style");
node.type = "text/css";
node.textContent = style;
head.appendChild(node);