// ==UserScript==
// @name       Old War-facts
// @namespace  http://war-facts.com
// @version    0.2
// @description  Out with the new, in with the old
// @include        http://*.war-facts.com/*
// @copyright  2012+, Everyone
// ==/UserScript==

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
    aEl.href = aEl.href.replace('fleet_new','fleet_management');
    aEl.href = aEl.href.replace('/fleet.php','/fleet_navigation.php');
    aEl.href = aEl.href.replace('/admin/uncached.php','/battle_history.php');
}