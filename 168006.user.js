// ==UserScript==
// @name        HoW status (Primera)
// @namespace   http://userscripts.org/users/467084
// @description Hell on Wheels status indicator for e-sim (Primera)
// @include     http://primera.e-sim.org/
// @include     http://primera.e-sim.org/index.html
// @include		http://primera.e-sim.org/battle.html?id=*
// @version     1
// @grant		GM_getValue
// @grant		GM_setValue
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$(function () {
	function main() {
		var battles = $("#defaultBattles").closest("td");
		var password = GM_getValue("howpass", -1);

		if (battles.length == 1) // we should be on main page
		{
			battles.prepend('<div style="width:340px;float:left" class="testDivblue"><center><b>HoW status:</b><br><img src="http://esimstats.org/how/' + password + '"><br/><br/><a href="article.html?id=58892">What is HoW?</a> -- <a href="">Go to IRC</a> -- <a href="#" id="changeHoWPass">Change pass</a></center></div><p style="clear: both"></p><br/>');
			//<p style="clear: both">
		} else {
			var elem = $("#battleRoundId");
			$("#battleRoundId").after('<br/><div style="width:120px;float:inherit" class="testDivblue"><center><b>HoW status:</b><br><img src="http://esimstats.org/how/' + password + '"></center></div><p style="clear: both">');
		}

		$("#changeHoWPass").on("click", function (e) {
			var res = window.prompt("Please enter the HoW password:", "");
			GM_setValue("howpass", res);
			e.preventDefault();
			location.reload();
		});
	}

	main();

});
