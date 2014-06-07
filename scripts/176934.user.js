// ==UserScript==
// @name       Poppa
// @namespace  benzeb666
// @version    1.0
// @description  Redirects from the update page
// @include      http://*.storm8.com/upgrade_latest.php?*
// @copyright  2013
// ==/UserScript==

var game = String(location).split('/')[2].split('.')[0];

if (game == "im") {
document.location = "http://im.storm8.com/fight.php?"; }