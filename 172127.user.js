// ==UserScript==
// @name        [743049] Hide un-attackable faction war members
// @namespace   www.torn.com/profiles.php?XID=743049
// @description Hides anyone who is flying, in hosp, or jail.
// @updateURL   http://userscripts.org/scripts/source/172127.user.js
// @include     https://www.torn.com/factions.php?step=hitlist
// @include     http://www.torn.com/factions.php?step=hitlist
// @version     1.0.1
// ==/UserScript==

window.onload = function () {
	var tbody = $('table[class="data"] > tbody > tr[class="bgSubHead"] > td[colspan="7"] > table[class="nopad"]').parent().parent().parent();			
	$('tr[class!="bgSubHead"] font[color="#FF0000"]',tbody).each(function () {
			$(this).parent().parent().remove();
	});
};