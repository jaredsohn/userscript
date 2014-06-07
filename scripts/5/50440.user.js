// ==UserScript==
// @name           Anti Ikariam PLUS
// @description    Hide all things related to Ikariam PLUS.
// @autor          $hikamaru
// @version        1.0.0
// @include        http://s*.ikariam.*/*
// ==/UserScript==


/* SUMMARY

Intended for the version of the game:
 - 0.3.1

These things are removed:
 - Quantity of ambrosias in Your empire`s ressources
 - Quantity of ambrosias in Other game options
 - Images of plus on Advisers
 - Button Save in archive in Messages and Combat reports
 - Building construction list in Town
 - Boxes in Overviews and Trading post
 - Premium Trader in Town hall
 - Boxes in Overviews and Trading post + Mercenary transporter

And these things are added:
 - Replace the normal Advisor for premium Advisor

*/




// Quantity of ambrosias in Your empire`s ressources (Množství ambrosií v Surovinách vašeho impéria)
var tags = document.evaluate("//li[@class='ambrosia']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}


// Quantity of ambrosias in Other game options (Množství ambrosií v Jiných možnostech)
var tags = document.evaluate("//li[@class='premium']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}


// Images of plus on Advisers (Obrázky plusů na poradcích)
var tags = document.evaluate("//a[@class='plusteaser']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}


// Button Save in archive in Messages and Combat reports (Tlačítko Uložit do archivu ve Zprávách a Bitevních zprávách)
var tags = document.evaluate("//span[@class='costAmbrosia']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode;
	del.parentNode.removeChild(del);
}


// Building construction list in Town (Stavební řada v Městě)
var tags = document.evaluate("//a[@href='?view=premium']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode.parentNode.parentNode;
	if(del.hasAttribute("id") && del.getAttribute("id") == "reportInboxLeft")
	{
		del.parentNode.removeChild(del);
	}
}


// Boxes in Overviews and Trading post + Mercenary transporter (Boxy v Přehledech a na Tržišti + Námezdní transport)
var values = new Array("trader", "viewCityImperium", "viewMilitaryImperium", "viewResearchImperium", "viewDiplomacyImperium", "setPremiumTransports");
for(var i = 0; i < values.length; i++)
{
	var del = document.getElementById(values[i]);
	if(del != null)
	{
		del.parentNode.removeChild(del);
	}
}


// Premium Trader in Town hall (Obchodník v Městské radnici)
var tags = document.evaluate("//div[@class='premiumExchange']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}




// Replace the normal Advisor for premium Advisor (Nahradí normální Poradce za prémiové  Poradce)
//GM_addStyle("#advisors #advCities a.normal {background-image:url(/skin/layout/advisors/mayor_premium.gif)}");
//GM_addStyle("#advisors #advCities a.normalactive {background-image:url(/skin/layout/advisors/mayor_premium_active.gif)}");
//GM_addStyle("#advisors #advMilitary a.normal {background-image:url(/skin/layout/advisors/general_premium.gif)}");
//GM_addStyle("#advisors #advMilitary a.normalactive {background-image:url(/skin/layout/advisors/general_premium_active.gif)}");
//GM_addStyle("#advisors #advMilitary a.normalalert {background-image:url(/skin/layout/advisors/general_premium_alert.gif)}");
//GM_addStyle("#advisors #advResearch a.normal {background-image:url(/skin/layout/advisors/scientist_premium.gif)}");
//GM_addStyle("#advisors #advResearch a.normalactive {background-image:url(/skin/layout/advisors/scientist_premium_active.gif)}");
//GM_addStyle("#advisors #advDiplomacy a.normal {background-image:url(/skin/layout/advisors/diplomat_premium.gif)}");
//GM_addStyle("#advisors #advDiplomacy a.normalactive {background-image:url(/skin/layout/advisors/diplomat_premium_active.gif)}");