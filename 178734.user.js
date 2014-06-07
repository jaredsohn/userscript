// ==UserScript==
// @name       New War-facts
// @namespace  http://war-facts.com
// @version    0.2
// @description  Out with the new, in with the old
// @include        http://*.war-facts.com/*
// @copyright  2012+, Everyone
// ==/UserScript==

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
    aEl.href = aEl.href.replace('.com/view_colony','.com/templates/view_colony');
    aEl.href = aEl.href.replace('/fleet.php','/templates/fleet.php');
    //aEl.href = aEl.href.replace('fleet_new','fleet_management');
    aEl.href = aEl.href.replace('.com/starlog.php','.com/templates/starlog.php');
    aEl.href = aEl.href.replace('.com/message.php','.com/templates/message.php');
    aEl.href = aEl.href.replace('.com/science.php','.com/templates/science.php');
    aEl.href = aEl.href.replace('.com/ship_designs.php','.com/templates/ship_designs.php');
    aEl.href = aEl.href.replace('/admin/uncached.php','/battle_history.php');
}