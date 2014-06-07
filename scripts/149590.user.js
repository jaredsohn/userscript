// ==UserScript==
// @name        eu2T-Linker
// @namespace   PimpTrizkit.com
// @include     http://eu2.looki.com/battle/battle_report_info.php?area=interactive&battle_report_id=*
// @include     http://*pimptrizkit.com/pages/eu2T/eu2T*.html*
// @version     1.0
// @grant		GM_setValue
// @grant		GM_getValue
// ==/UserScript==

if ( location.href.indexOf ("looki") > 0 ) GM_setValue("BattleData", "battle_log["+document.body.innerHTML.split("battle_log[").splice(1).join("battle_log["));
else if ( location.href.indexOf("pimptrizkit") > 0 ) window.addEventListener("load", function() { document.getElementById("eu2T-BAButton").addEventListener("click", function(){unsafeWindow.Linker(GM_getValue("BattleData"));}, false ); }, false);