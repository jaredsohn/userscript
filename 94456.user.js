var metadata=<> 
// ==UserScript==
// @name           Premium Hide
// @namespace      http://userscripts.org/scripts/show/94456
// @include        http://s*.ikariam.com/*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version	   1.0b
// @updater:script http://userscripts.org/scripts/source/94456.user.js
// @updater:meta   http://userscripts.org/scripts/source/94456.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

// Update-Check
var update = new Updater(metadata,window.location.href.replace(/........\d+.(\w+).*/,"$1"));
update.update();


var reportInboxLeft = document.getElementById('reportInboxLeft');
if(reportInboxLeft && !document.getElementById('units') && !document.getElementById('backTo'))
	reportInboxLeft.parentNode.removeChild(reportInboxLeft);
	
reportInboxLeft = document.getElementById('reportInboxLeft');
if(reportInboxLeft && !document.getElementById('units') && !document.getElementById('backTo'))
	reportInboxLeft.parentNode.removeChild(reportInboxLeft);

var viewCityImperium = document.getElementById('viewCityImperium');
if(viewCityImperium)
	viewCityImperium.parentNode.removeChild(viewCityImperium);
	
var viewMilitaryImperium = document.getElementById('viewMilitaryImperium');
if(viewMilitaryImperium)
	viewMilitaryImperium.parentNode.removeChild(viewMilitaryImperium);
	
var viewResearchImperium = document.getElementById('viewResearchImperium');
if(viewResearchImperium)
	viewResearchImperium.parentNode.removeChild(viewResearchImperium);
	
var viewDiplomacyImperium = document.getElementById('viewDiplomacyImperium');
if(viewDiplomacyImperium)
	viewDiplomacyImperium.parentNode.removeChild(viewDiplomacyImperium);
