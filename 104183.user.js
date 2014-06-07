// ==UserScript==
// @name           OGame Redesign: Combat Losses
// @description    Shows the number of lost ships in the detailed combat reports
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.03
// @date           2011-07-18
// @include        http://*.ogame.*/game/index.php?page=combatreport*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=combatreport") < 0)
		return;
	const inLine = true;
	var combatResult = document.querySelectorAll ("div.combat_round");
	if (combatResult == null)
		return;
	function getRemains (results, playerShipsLeftNames, playerShipsLeftNumbers)
	{
		var players = results.querySelectorAll ("tr td table tr td.newBack");
		for (var player = 0; player < players.length; player++)
		{
			playerShipsLeftNames [player] = new Array ();
			playerShipsLeftNumbers [player] = new Array ();
			var finalTRs = players [player].querySelectorAll ("center table tr");
			if (finalTRs.length == 0)
				continue;
			var shipNames = finalTRs [0].querySelectorAll ("th");
			var shipNumbers = finalTRs [1].querySelectorAll ("td");
			for (var i = 1; i < shipNames.length; i++)
			{
				playerShipsLeftNames [player].push (shipNames [i].textContent);
				playerShipsLeftNumbers [player].push (parseInt (shipNumbers [i].textContent.replace (/\D+/, "")));
			}
		}
	}
	function putDiffs (initials, playerShipsLeftNames, playerShipsLeftNumbers)
	{
		function addDots (n)
		{
			n += '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test (n))
				n = n.replace (rgx, '$1' + '.' + '$2');
			return n;
		}
		var players = initials.querySelectorAll ("tr td table tr td.newBack");
		for (var player = 0; player < players.length; player++)
		{
			var initialTRs = players [player].querySelectorAll ("table tr");
			if (initialTRs.length <= 0)
				continue;
			shipNames = initialTRs [0].querySelectorAll ("th");
			shipNumbers = initialTRs [1].querySelectorAll ("td");
			var shipsDestroyed = new Array ();
			var someDestroyed = false;
			for (var i = 1; i < shipNames.length; i++)
			{
				var shipName = shipNames [i].textContent;
				var theDiff = parseInt (shipNumbers [i].textContent.replace (/\D+/g, ""));
				for (j = 0; j < playerShipsLeftNames [player].length; j++)
					if (playerShipsLeftNames [player] [j] == shipName)
					{
						theDiff -= playerShipsLeftNumbers [player] [j];
						break;
					}
				if (theDiff > 0)
				{
					if (inLine)
					{
						var difference = document.createElement ("font");
						difference.style.color = "red";
						difference.appendChild (document.createTextNode ("-" + addDots (theDiff)));
						shipNumbers [i].appendChild (difference);
					}
					shipsDestroyed.push (theDiff);
					someDestroyed = true;
				}
				else
					shipsDestroyed.push (0);
			}
		}
		if (inLine || ! someDestroyed)
			return;
		var newTr = document.createElement ("tr");
		var newTd = document.createElement ("td");
		newTr.appendChild (newTd);
		for (var i = 0; i < shipsDestroyed.length; i++)
		{
			newTd = document.createElement ("td");
			if (shipsDestroyed [i] > 0)
			{
				newTd.style.color = "red";
				newTd.appendChild (document.createTextNode ("-" + addDots (shipsDestroyed [i])));
			}
			newTr.appendChild (newTd);
		}
		initialTRs [2].parentNode.insertBefore (newTr, initialTRs [2]);
	}
	var attackerShipsLeftNames = new Array ();
	var defenderShipsLeftNames = new Array ();
	var attackerShipsLeftNumbers = new Array ();
	var defenderShipsLeftNumbers = new Array ();
	var firstRound = combatResult [0];
	var lastRound  = combatResult [combatResult.length - 1];
	var initials = firstRound.children;
	var results  = lastRound.children;
	getRemains (results [1], attackerShipsLeftNames, attackerShipsLeftNumbers);
	getRemains (results [2], defenderShipsLeftNames, defenderShipsLeftNumbers);
	putDiffs  (initials [1], attackerShipsLeftNames, attackerShipsLeftNumbers);
	putDiffs  (initials [2], defenderShipsLeftNames, defenderShipsLeftNumbers);
}
) ();
