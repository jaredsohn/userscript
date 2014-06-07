// ==UserScript==
// @name 		EveIGB
// @author 		ChrisWF
// @date 		2014
// @namespace 	evewf
// @include 	http://www.redemption-road.com/forum/*
// @include 	http://evemaps.dotlan.net/*
// @include 	http://fleet-up.com/*
// @include 	http://www.eve-bet.com/*
// @grant 		none
// @grant 		none
// ==/UserScript==

(function()
{
try {

if(!window.CCPEVE)
   window.CCPEVE = {};
   
window.CCPEVE.showMap = function(systemId) 
{
	if(systemId)
		window.open("http://evemaps.dotlan.net/map/" + systemId);
	else
		window.open("http://evemaps.dotlan.net/map");		
}

window.CCPEVE.showOnMap = function(systemId) 
{
	if(systemId)
		window.open("http://evemaps.dotlan.net/map/" + systemId);
	else
		window.open("http://evemaps.dotlan.net/map");		
}

window.CCPEVE.showInfo = function(typeId, entityId)
{
	if (typeId == 3) // Region
		window.open("http://evemaps.dotlan.net/region/" + entityId);
	else if (typeId == 4) // Constell.
		window.open("http://evemaps.dotlan.net/map/" + entityId);	
	else if (typeId == 5) // System
		window.open("http://evemaps.dotlan.net/system/" + entityId);
		
	else if (typeId == 2) // Corp	
		window.open("http://evemaps.dotlan.net/corp/" + entityId);	
	else if (typeId == 16159)  // Alliance	
		window.open("http://evemaps.dotlan.net/alliance/" + entityId);	
	else if (typeId == 30)  // Faction
		return;
	else if (typeId == 1377) // Pilot
		window.open("http://evewho.com/pilotid/" + entityId);		
	else
		window.open("https://zkillboard.com/item/" + typeId);
}

window.CCPEVE.showRouteTo = function (from, to)
{
	window.open("http://evemaps.dotlan.net/route/" + from + ":" + to);
}

window.CCPEVE.openEveMail = function ()
{
	window.open("https://gate.eveonline.com//Mail/Inbox");
}

window.CCPEVE.showMarketDetails = function (typeId)
{
	window.open("http://eve-central.com/home/quicklook.html?typeid=" + typeId);
}

window.CCPEVE.showFitting = function (dns)
{
	window.open("http://o.smium.org/loadout/dna/" + dns);
}

} catch (eErr) {
alert ("Greasemonkey error: " + eErr);
}

return;
}
) (); 