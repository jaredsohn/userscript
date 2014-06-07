// ==UserScript==

// @name           Tools_Ogame_Tech_Max_Lvl
// @namespace      monkeyisback
// @version        2.1
// @author         MonkeyIsBack
// @include        http://*ogame.*page=research*

// ==/UserScript==

// Thanks to Vess (userscripts.org) for all the changes he made on the script for portability & optimization of this code

(function ()
{
	// "if" for portability on Opera
	if (document.location.href.indexOf ("/game/index.php?page=research") == -1)
		return;
	var mySpan;
	
	var researches = [
		[113, 12, "#FF5500"],
		[120, 12, "red"],
		[121,  5, "red"],
		[114,  8, "red"],
		[122,  7, "red"],
		[199,  1, "red"]
	];
	
	for (i = 0; i < researches.length;i++)
	{
		mySpan = document.createElement ("span");
		mySpan.className = "undermark";
		mySpan.style.color = researches[i][2];
		mySpan.appendChild(document.createTextNode (" /" + researches[i][1]));
		document.getElementById ("details" + researches [i] [0]).getElementsByTagName("span")[1].appendChild(mySpan);
	}

}
) ();