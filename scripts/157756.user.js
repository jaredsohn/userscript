// ==UserScript==
// @name           Mafiacreator Scratchcards viewer
// @namespace      userXscript
// @author         userXscript
// @description    Scratchcards viewer
// @version        1.03
// @include        http://www.mafiacreator.com/*/scratch-cards
// @include        http://www.youmafia.com/scratch-cards
// @require        http://www.youmafia.com/scripts/jquery-1.7.1.js
// ==/UserScript==

(function () {
	$("table.content_table tbody tr td").children().css('display', 'block');
})();