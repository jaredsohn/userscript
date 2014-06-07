// ==UserScript==
// @name           Broken stuff
// @namespace      emil.haukeland.name
// @description    Alerts you if your stuff breaks
// @include        http://www.syrnia.com/game.php
// ==/UserScript==
function priv_checkForBrokenStuff()
{
	// Get the LocationContent table-cell
	var LocationContent = document.getElementById('LocationContent');

	if(typeof LocationContent != "undefined")
	{
		if(LocationContent.children.item(0).children.item(0) != null)
		{
			if(typeof LocationContent.children.item(0).children.item(0).textContent != "undefined")
			{
				var redText = LocationContent.children.item(0).children.item(0).textContent;
	
				if(redText.search(/broke/i) > 0)
				{
					alert(redText);
				}
			}
		}	
	}
	window.setTimeout(priv_checkForBrokenStuff,10000);
}
window.setTimeout(priv_checkForBrokenStuff,10000);
