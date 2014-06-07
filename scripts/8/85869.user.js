// ==UserScript==
// @name           Anti Ikariam PLUS
// @namespace      http://userscripts.org/scripts/show/50026
// @description    Hide all things related to Ikariam PLUS. Compatible with Ikariam 0.4.0.
// @autor          $hikamaru (Update 4.0 by KeyKon)
// @version        1.4.0
// @include        http://s*.ikariam.*/index.php*
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// ==/UserScript==



// Auto updater (Automatické aktualizace)
new IkariamUserScriptUpdater(50026, "Anti Ikariam PLUS");



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
	if(del.id == "reportInboxLeft")
	{
		del.parentNode.removeChild(del);
	}
}

// Building FriendInvite
var tags = document.evaluate("//a[@href='?view=optionsInviteFriends']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode.parentNode.parentNode;
	if(del.id == "reportInboxLeft")
	{
		del.parentNode.removeChild(del);
	}
}

// Boxes in Overviews and Trading post + Mercenary transporter + Ads (Boxy v Přehledech a na Tržišti + Námezdní transport + Reklamy)
var values = new Array("trader", "viewCityImperium", "viewMilitaryImperium", "viewResearchImperium", "viewDiplomacyImperium", "setPremiumTransports", "banner_container");
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


//Warehouse and Dump
var tags = document.evaluate("//div[@class='premiumFeature']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}

// Archive in miliarty Advisor (Archiv v armádním Poradci)
var tags = document.evaluate("//a[@href='?view=militaryAdvisorCombatReportsArchive']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode;
	del.parentNode.removeChild(del);
}

// Banner Ad (Banerová reklama)
var value = document.getElementsByTagName("iframe");
for(var i = 0; i < value.length; i++)
{
	var del = value[i].parentNode;
	del.parentNode.removeChild(del);
}



// Replace the normal Advisor for premium Advisor (Nahradí normální Poradce za prémiové  Poradce)
GM_addStyle("#advisors #advCities a.normal {background-image:url(/skin/layout/advisors/mayor_premium.gif)}");
GM_addStyle("#advisors #advCities a.normalactive {background-image:url(/skin/layout/advisors/mayor_premium_active.gif)}");
GM_addStyle("#advisors #advMilitary a.normal {background-image:url(/skin/layout/advisors/general_premium.gif)}");
GM_addStyle("#advisors #advMilitary a.normalactive {background-image:url(/skin/layout/advisors/general_premium_active.gif)}");
GM_addStyle("#advisors #advMilitary a.normalalert {background-image:url(/skin/layout/advisors/general_premium_alert.gif)}");
GM_addStyle("#advisors #advResearch a.normal {background-image:url(/skin/layout/advisors/scientist_premium.gif)}");
GM_addStyle("#advisors #advResearch a.normalactive {background-image:url(/skin/layout/advisors/scientist_premium_active.gif)}");
GM_addStyle("#advisors #advDiplomacy a.normal {background-image:url(/skin/layout/advisors/diplomat_premium.gif)}");
GM_addStyle("#advisors #advDiplomacy a.normalactive {background-image:url(/skin/layout/advisors/diplomat_premium_active.gif)}");

// Indicator of gold is moved higher (Ukazatel zlata je posunut výše)
GM_addStyle("#globalResources .gold a {top:3px;width:98px;height:29px;background:url(/skin/layout/btn_gold.jpg) no-repeat 0px 0px;padding-right:12px;line-height:29px;text-align:right}");

// Menu in miliarty Advisor is centered (Menu v armádním Poradci je vycentrováno)
GM_addStyle(".yui-navset .yui-nav li, .yui-navset .yui-navset-top .yui-nav li, .yui-navset .yui-navset-bottom .yui-nav li {height:32px;width:199px;margin:0px 0px 0px 94px}");
