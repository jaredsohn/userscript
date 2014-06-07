// ==UserScript==
// @name           Ikariam Anti-PLUS
// @namespace      http://www.ikariam.org
// @description    This hides all ikariam PLUS items and includes golden Advisors
// @autor          DemonWarrior
// @version        1
// @include        http://s*.ikariam.*/index.php*
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// ==/UserScript==

// Auto updater (AutomatickÃ© aktualizace)
new IkariamUserScriptUpdater(50026, "Anti Ikariam PLUS");



// Quantity of ambrosias in Your empire`s ressources (MnoÅ¾stvÃ­ ambrosiÃ­ v SurovinÃ¡ch vaÅ¡eho impÃ©ria)
var tags = document.evaluate("//li[@class='ambrosia']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}

// Quantity of ambrosias in Other game options (MnoÅ¾stvÃ­ ambrosiÃ­ v JinÃ½ch moÅ¾nostech)
var tags = document.evaluate("//li[@class='premium']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}

// Images of plus on Advisers (ObrÃ¡zky plusÅ¯ na poradcÃ­ch)
var tags = document.evaluate("//a[@class='plusteaser']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}

// Button Save in archive in Messages and Combat reports (TlaÄÃ­tko UloÅ¾it do archivu ve ZprÃ¡vÃ¡ch a BitevnÃ­ch zprÃ¡vÃ¡ch)
var tags = document.evaluate("//span[@class='costAmbrosia']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode;
	del.parentNode.removeChild(del);
}

// Building construction list in Town (StavebnÃ­ Å™ada v MÄ›stÄ›)
var tags = document.evaluate("//a[@href='?view=premium']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode.parentNode.parentNode;
	if(del.id == "reportInboxLeft")
	{
		del.parentNode.removeChild(del);
	}
}

// Boxes in Overviews and Trading post + Mercenary transporter + Ads (Boxy v PÅ™ehledech a na TrÅ¾iÅ¡ti + NÃ¡mezdnÃ­ transport + Reklamy)
var values = new Array("trader", "viewCityImperium", "viewMilitaryImperium", "viewResearchImperium", "viewDiplomacyImperium", "setPremiumTransports", "banner_container");
for(var i = 0; i < values.length; i++)
{
	var del = document.getElementById(values[i]);
	if(del != null)
	{
		del.parentNode.removeChild(del);
	}
}

// Premium Trader in Town hall (ObchodnÃ­k v MÄ›stskÃ© radnici)
var tags = document.evaluate("//div[@class='premiumExchange']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i);
	del.parentNode.removeChild(del);
}

// Archive in miliarty Advisor (Archiv v armÃ¡dnÃ­m Poradci)
var tags = document.evaluate("//a[@href='?view=militaryAdvisorCombatReportsArchive']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < tags.snapshotLength; i++)
{
	var del = tags.snapshotItem(i).parentNode;
	del.parentNode.removeChild(del);
}

// Banner Ad (BanerovÃ¡ reklama)
var value = document.getElementsByTagName("iframe");
for(var i = 0; i < value.length; i++)
{
	var del = value[i].parentNode;
	del.parentNode.removeChild(del);
}



// Replace the normal Advisor for premium Advisor (NahradÃ­ normÃ¡lnÃ­ Poradce za prÃ©miovÃ©  Poradce)
GM_addStyle("#advisors #advCities a.normal {background-image:url(/skin/layout/advisors/mayor_premium.gif)}");
GM_addStyle("#advisors #advCities a.normalactive {background-image:url(/skin/layout/advisors/mayor_premium_active.gif)}");
GM_addStyle("#advisors #advMilitary a.normal {background-image:url(/skin/layout/advisors/general_premium.gif)}");
GM_addStyle("#advisors #advMilitary a.normalactive {background-image:url(/skin/layout/advisors/general_premium_active.gif)}");
GM_addStyle("#advisors #advMilitary a.normalalert {background-image:url(/skin/layout/advisors/general_premium_alert.gif)}");
GM_addStyle("#advisors #advResearch a.normal {background-image:url(/skin/layout/advisors/scientist_premium.gif)}");
GM_addStyle("#advisors #advResearch a.normalactive {background-image:url(/skin/layout/advisors/scientist_premium_active.gif)}");
GM_addStyle("#advisors #advDiplomacy a.normal {background-image:url(/skin/layout/advisors/diplomat_premium.gif)}");
GM_addStyle("#advisors #advDiplomacy a.normalactive {background-image:url(/skin/layout/advisors/diplomat_premium_active.gif)}");

// Indicator of gold is moved higher (Ukazatel zlata je posunut vÃ½Å¡e)
GM_addStyle("#globalResources .gold a {top:33px;width:98px;height:29px;background:url(/skin/layout/btn_gold.jpg) no-repeat 0px 0px;padding-right:12px;line-height:29px;text-align:right}");

// Menu in miliarty Advisor is centered (Menu v armÃ¡dnÃ­m Poradci je vycentrovÃ¡no)
GM_addStyle(".yui-navset .yui-nav li, .yui-navset .yui-navset-top .yui-nav li, .yui-navset .yui-navset-bottom .yui-nav li {height:32px;width:199px;margin:0px 0px 0px 94px}");

function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21, #city #container .phase22, #city #container .phase23, #city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30, #city #container .phase31, #city #container .phase32, #city #container .phase33, #city #container .phase34, #city #container .phase35, #city #container .phase36, #city #container .phase37, #city #container .phase38, #city #container .phase39, #city #container .phase40, #city #container .phase1012 {background-image:url(http://img522.imageshack.us/img522/6444/cityphase75vw3.jpg);}');
addNewStyle('#city #container #mainview #locations .wall .buildingimg {background-image:url(http://img352.imageshack.us/img352/8684/spacervf7.gif);}');