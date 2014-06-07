// ==UserScript==
// @name       disable attack warner
// @namespace  -
// @version    0.1
// @include        http://*.ogame.*
// @copyright  2012+, molokatan
// ==/UserScript==

var attackItem;

attackItem = document.getElementById('attack_alert');
if(attackItem) {attackItem.style.visibility = "hidden";}