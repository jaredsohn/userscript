// ==UserScript==
// @name           Inventory
// @namespace      none
// @description    Quick inventory links
// @include        http://www*.kingdomofloathing.com/topmenu.php
// ==/UserScript==


var tmp = document.body.innerHTML;
tmp = tmp.replace(/inventory<\/a/,
    '<a target="mainpane" href="inventory.php?which=1">inv</a>'
    + '<a target="mainpane" href="inventory.php?which=2">ent</a'
    + '<a target="mainpane" href="inventory.php?which=3">ory</a ');
document.body.innerHTML = tmp;