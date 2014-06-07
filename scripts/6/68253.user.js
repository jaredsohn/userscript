
// ==UserScript==
// @name          Block Annoying Digg User Submissions
// @description   Hides all stories submitted by certain Digg Users
// @include       http://digg.com/*
// @version	      1.0.2
// ==/UserScript==


/*
	
Why this script?
I really enjoy digg.com. It is a constant source of interesting information and amusement. However, there is
a small group of people who for some reason "get off" from each submitting literally thousands of stories (a lot of them 
duplicate) which get promoted to the digg front page. 

This is not only annoying but it also discourages others from submitting their own links. So, why give these people
any recognition? Install this script to hide stories submitted by these users. 

CHANGELOG
=========

Version 1.0.0 - 02-Feb-2010
	- Initial Release
	
Version 1.0.1 - 02-Feb-2010
	- Initial Release	
	
Version 1.0.2 - 02-Feb-2010
	- Refactored to use XPath
*/

(function() {
	
	/*
	 * Add/change any Digg users you want to block by adding them to 
	 * the list below (names must be separated by commas).
	 * The users I've listed here already the users I've chosen to ignore.
	 */
	var blockedUsers = ["MrBabyMan", "LtGenPanda", "msaleem", "mklopez", "jaybol", "badwithcomputer", "louiebaur",
						"skored", "Burento", "TalSiach", "SirPopper", "AmyVernon", "irfanmp", "IvanB", "Bukowsky",
						"ScottMcIntyre", "openthink", "MediaSight", "diggleague", "upick", "hdar3415", "chris1234",
						"1KrazyKorean", "webtickle", "badqat", "TheEngineer2008", "ThePowerDigger", "oboy", "vtbarre",
						"noupsell", "d2002", "motang", "anderzole", "xdvx", "bamafun", "vroom101", "Blinker1315",
						"gamebittk", "absolutelytrue", "jboitnott", "ritubpant", "lekahe", "casspa", "bixby1", "RunDiggMC",
						"kplo", "EMFK", "tbhurst"];

	
	
	var enclosures = document.evaluate("//div[contains(@id, 'enclosure')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i = 0; i < enclosures.snapshotLength; i++) {
		var div = enclosures.snapshotItem(i);
		var user = document.evaluate("div/div/p/em[2]/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
		if (user.length == 0) {
			user = document.evaluate("div/p/em[2]/a/text()", div, null, XPathResult.STRING_TYPE, null).stringValue;
		}
		
		for (var j = 0; j < blockedUsers.length; j++) {
			if (user == blockedUsers[j]) {
				div.style.display = "none";
				break;
			}
		}	
		
	}  
	
})();
