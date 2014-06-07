// ==UserScript==
// @name         ELITE Duel Report
// @version      0.04
// @description  Test Script
// @author       xShteff
// @website      http://the-west.ro
// @include      http://*.the-west.*/game.php*
// @namespace    http://userscripts.org/scripts/show/477342
// @updateURL    http://userscripts.org/scripts/source/477342.user.js
// ==/UserScript==

jQuery("#buffbars").append("<div id='testyreport'><a href='#' id='publishreport' title='<b>Publish that silly report!</b>'><img src='http://puu.sh/8j903.png' style='position:relative;top:-48px;left:-50px;height:43px;'></a></div>");
	

$('#publishreport').click( function(e) {
    $.getScript('http://petee.tw-db.info/uploads/tw_beta_elite_duelreport.js');  
});



