// ==UserScript==
// @name           Forsaken off
// @namespace      http://userscripts.org/
// @description    Turns The Forsaken off in the forum
// @version        1.1
// @include        http://forum.travian.pt/showthread.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(function() {
	try {
		$("td.quote_trav > div:first-child > strong:contains('The Forsaken')").closest("td").hide();
		$("a.bigusername[href='member.php?u=8074']").closest("table").hide();
	} catch(e) {};
});