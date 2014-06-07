// ==UserScript==
// @name       Svenska Tribalwars farmassistent, effektivisering
// @namespace  http://www.tribalwars.se/
// @version    0.9
// @description  Effektivare farmassistent
// @match      http://*.tribalwars.se/game.php*screen=am_farm
// @copyright  2014+, Someone
// ==/UserScript==
(function (){$("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function() {$(this).closest("tr").remove();});})();
