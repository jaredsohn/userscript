// ==UserScript==
// @name           OGame Redesign: Fix the Universe Name in the Pillory
// @description    Fixes the universe name in the Pillory.
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.04
// @date           2011-06-14
// @include        http://*.ogame.*/game/pranger.php*
// ==/UserScript==

(function ()
{
	var theUrl = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (theUrl.indexOf ("/game/pranger.php") < 0)
		return;
	var titles = document.getElementsByTagName ("title");
	if (titles.length <= 0)
		return;
	var titleText = titles [0].textContent;
	var master = document.getElementById ("master");
	if (master == null)
		return;
	var myHls = master.childNodes;
	if ((myHls == null) || (myHls.length < 2))
		return;
	var titleSpan = myHls [1].firstChild;
	if (titleSpan == null)
		return;
	var titleSpanText = titleSpan.textContent;
	var titleTextUniNums = titleText.match (/\d+/);
	if (titleTextUniNums.length < 1)
		return;
	var uniNum = titleTextUniNums [0];
	var uniNames = [
		["101", "Andromeda"],
		["102", "Barym"],
		["103", "Capella"],
		["104", "Draco"],
		["105", "Electra"],
		["106", "Fornax"],
		["107", "Gemini"],
		["108", "Hydra"],
		["109", "Io"],
		["110", "Jupiter"],
		["111", "Kassiopeia"],
		["112", "Leo"],
		["113", "Mizar"],
		["114", "Nekkar"],
		["115", "Orion"],
		["116", "Pegasus"],
		["117", "Quantum"],
		["118", "Rigel"],
		["119", "Sirius"],
		["120", "Taurus"],
		["121", "Ursa"],
		["122", "Vega"],
		["123", "Wasat"],
		["124", "Xalynth"],
		["125", "Yakini"],
		["126", "Zagadra"]
	];
	for (var i = 0; i < uniNames.length; i++)
		if (uniNum == uniNames [i] [0])
		{
			titles [0].textContent = titleText.replace     (uniNum, uniNames [i] [1]);
			titleSpan.textContent  = titleSpanText.replace (uniNum, uniNames [i] [1]);
			break;
		}
	var theTable = document.getElementsByTagName ("table");
	if (theTable.length < 1)
		return;
	theTable = theTable [0];
	var theLines = theTable.rows;
	var lastPage = theTable.rows.length < 52;	// 50 lines per page, 1 header, 1 paginator
	var paginator = theTable.rows [theTable.rows.length - 1].cells [0];
	if (paginator.innerHTML.replace (/\s+/, "").length > 0)
		return;
	var parts = theUrl.split ("?&site=");
	var site = parts [0];
	var currentPage = (parts.length < 2) ? 1 : parseInt (parts [1]);
	function addButton (link, text)
	{
		var myA = document.createElement ("a");
		myA.href = link;
		var myButton = document.createElement ("input");
		myButton.type = "button";
		myButton.value = text;
		myA.appendChild (myButton);
		return myA;
	}
	if (currentPage > 1)
	{
		paginator.appendChild (addButton (site + "?&site=1", "<<"));
		paginator.appendChild (document.createTextNode (" "));
		paginator.appendChild (addButton (site + "?&site=" + (currentPage - 1), "<"));
		paginator.appendChild (document.createTextNode (" "));
	}
	var mySpan = document.createElement ("span");
	mySpan.style.fontSize = "20px";
	mySpan.style.verticalAlign = "text-bottom";
	mySpan.appendChild (document.createTextNode (" " + currentPage + " "));
	paginator.appendChild (mySpan);
	if (! lastPage)
	{
		paginator.appendChild (document.createTextNode (" "));
		paginator.appendChild (addButton (site + "?&site=" + (currentPage + 1), ">"));
	}
}
) ();
