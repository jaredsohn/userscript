// ==UserScript==
// @name        Unicreature Exchange Buttons on Top
// @namespace   http://trueidiocy.us
// @description Adds pet management buttons to top of page in the Unicreatures Exchange
// @include     http://exchange.unicreatures.com/manage.php
// @version     1.1.0
// @copyright	© krazykat1980
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0
// @grant       GM_addStyle
// ==/UserScript==

var theTable=document.getElementById("table_manage")
var bottomButtons=theTable.getElementsByTagName("tr")
var rowOne=bottomButtons[0]

bottomButtons=bottomButtons[bottomButtons.length-1].cloneNode(true);

rowOne.parentNode.insertBefore(bottomButtons, rowOne);