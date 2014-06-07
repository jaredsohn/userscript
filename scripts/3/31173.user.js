// ==UserScript==
// @name           Wordscraper Tweaks
// @namespace      http://www.dumbui.com/Wordscraper
// @description    Hides the Quicklinks graphic and displays the links and defaults various game criteria values.
// @include        http://apps.new.facebook.com/wordscraper/*
// @version        0.2
// ==/UserScript==

// Creative Commons Attribution License
//
// scauer at gmail.com and http://twitter.com/scauer
// 
// Version History
// 0.1
//   Initial release - Only deals with Quicklinks menu
//
// 0.2
//   Defaults game criteia, speed, language, type
	


(function(){
	// Adjust these value to change defaults
	var gamespeed = 'm'; // f=Fast m=Medium s=slow
	var gametype = 'R'; // R=Regular C=Challenge
	var dictionary = 'twl'; // twl=English - TWL, sow=English - SOWPODS, fr=French, it=Italian
	var ratingfrom = '1200';
	var ratingto = '1800';

	function DefaultElementValue(xpath, newValue)
	{
		var elements = document.evaluate(xpath, document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (elements.snapshotLength != 1)
		{
			// Only expecting 1 item to be returned, if more or less than 1, just ignore
			return;
		}
		elements.snapshotItem(0).value = newValue;
	}

	DefaultElementValue("//select[@name='dictionary']", dictionary);
	DefaultElementValue("//select[@name='gametype']", gametype);
	DefaultElementValue("//select[@name='gamespeed']", gamespeed);
	DefaultElementValue("//select[@name='speed']", gamespeed);
	DefaultElementValue("//input[@name='ratingfrom']", ratingfrom);
	DefaultElementValue("//input[@name='ratingto']", ratingto);


	// Fix the Quicklinks menu by hiding the QL grapic and dislaying the actual menu
	var quicklinksDiv = document.getElementById('app2521910901_quicklinksdiv');
	if (quicklinksDiv) quicklinksDiv.style.display = 'none';

	var actualLinks = document.getElementById('app2521910901_submenubuttonsdiv');
	if (actualLinks) actualLinks.style.display = '';
	
})();
	