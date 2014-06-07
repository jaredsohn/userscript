// ==UserScript== 
// @name          DaFont Helper
// @namespace     none
// @description   Changes the wording of font usage. Helps with what can be leaglly used for work or not. Free fonts will have no label. Free for personal use fonts will be labeled **PERSONAL**, etc
// @include       http://*dafont.com/*
// ==/UserScript==

//          From Jmaxxz vulgar word blocker v3.00.00, from which this script is derived:                //
/*********************************************************************************************************
* If you plan on editing this script and publishing your own version lines [11] through [18] must be     *
* included somewhere in your source code somewhere between lines 1 and 40.                               *
*                                                                                                        *
* Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey"                                  *
* The Jmaxxz Vulgar Word Blocker can be found at: http://userscripts.org/scripts/show/2287               *
* A Special thank you goes to rschultz2002 and Giorgio Maone for their help in the making of this script *
*********************************************************************************************************/

(function()
{
	var bad = [], good = [], modifiers = [];
	
	// START CONFIGURATION
	
	populate
	({
		// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently
		
		// Terms are listed as comma separated couples of words, in the form
		// "Bad word": "replacement"
		// You can place an optional modifier after a slash ("/") at the end of the bad word.
		// The support modifier "n", stands for new
		// it does not change how the word is handled by the script,
		// rather it is just so the developer know what he/she has changed in the latest build
		// incase something goes wrong

		"Free - " : "",
		"Free for personal use" : "**PERSONAL**",
		"Free" : "",
		"Public domain":"",
		"Demo":"$$$",
		"Donationware":"$$$",
		"Shareware":"$$$",
		"font files":"fonts",
		
		// [End of custom word list]
	}, "g");
	
	populate
	({
		// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same.
		
		// Terms are listed as comma separated couples of words, in the form
		// [Place custom word list below]
		
		// [End of custom word list]
		
	}, "gi");
	
	
	// END CONFIGURATION (don't touch anything below, unless you know what you're doing)
	
	function populate(replacements, flags)
	{
		var word, modPos, mod;
		
		for(var key in replacements)
		{
			if((modPos = key.indexOf("/")) > -1)
			{
				mod = key.substring(modPos + 1);
				word = key.substring(0, modPos);
			}
			else
			{
				mod = "";
				word = key;
			}
			
			modifiers.push(mod);
			bad.push(new RegExp(word, flags));
			good.push(replacements[key]);
		}
	}
	
	// this function does the replacements
	function sanitize(s, noContext, notredirect)
	{
		for (var j = 0; j < bad.length; j++)
		{
			if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") != -1)
			{
				continue;
			}
			s = s.replace(bad[j], good[j]);
		}
		return s;
	}
	
	// replace in title
	if(document.title)
		document.title = sanitize(document.title, false , true);
	
	// replace in body text
	var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < textnodes.snapshotLength; i++)
	{
		node = textnodes.snapshotItem(i);
		node.data = sanitize(node.data, false, true);
	}
})();