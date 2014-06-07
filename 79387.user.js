// ==UserScript==
// @name 		İkariam.Forumm.Biz
// @version		1.1
// @namespace	ikaSB
// @include	http://*speechbox.de/*
// @include	http://s*.ikariam.*
// @exclude	http://s*.ikariam.*/*?view=militaryAdvisorDetailedReportView*
// @exclude	http://s*.de.ikariam.*/index.php?detailedCombatId=*&view=militaryAdvisorDetailedReportView&combatRound=*
// @exclude	http://s*.ikariam.*/*?view=militaryAdvisorMilitaryMovements*
// @exclude	http://s*.ikariam.*/*?view=shipdescription*
// @exclude	http://s*.ikariam.*/*?view=unitdescription*
// @history	1.1 no shoutrbox detailed BR (view a round)
// @history	1.0 updater can handle downtimes of userscripts.org
// @history	0.6 minor patches to speechbox.de
// @history	0.5 only hide for "view" and not "oldView"
// @history	0.3 no shoutbox in ikipedia units
// @history	0.3 no shoutbox in ikipedia ships
// @history	0.2 no shoutbox in detailed Battle Report
// @history	0.2 no shoutbox in military movements
// @history	0.1 initial release
// ==/UserScript==

var defaultSBulr = 'http://www.ikariam.forumm.biz';

// update part 
var scriptName = "Shoutbox"
var scriptID = 79387;
var thisVersion="1.0";

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate = thisVersion != newestVersion;
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += ' <b>İkariam.Forumm.Biz</b></a>' }
	else { innerHTML += scriptName +' v'+thisVersion+'</a>' };
	return innerHTML;
};

function resetShoutboxURL() {
	var url= GM_getValue(document.domain + "sbURL", "");
	if (!url=="") {
		defaultSBulr=url;
		GM_setValue(document.domain + "sbURL", "");
	};
	getShoutboxURL();
	box.innerHTML = getSBinnerHTML();
	setSBClickEvents();
}
function getShoutboxURL() {
	var url= GM_getValue(document.domain + "sbURL", "")
	if (url=="") {
		url = prompt("Sohbet Linkinizi Yazın :", defaultSBulr);
		GM_setValue(document.domain + "sbURL", url);
	};
	return url;
};

function getCurrentView() {
	return document.domain + document.getElementsByTagName("body")[0].id
};

function getSBheight() { return parseInt(GM_getValue(getCurrentView(),"100")) };

function addSBheight(value) { GM_setValue(getCurrentView(),getSBheight()+value) };

function incSBheight() { 
	addSBheight(75); 
	box.innerHTML = getSBinnerHTML();
	setSBClickEvents();
};

function decSBheight() { 
	addSBheight(-75); 
	box.innerHTML = getSBinnerHTML();
	setSBClickEvents()
};

function getSBinnerHTML() {
	var height=getSBheight();
	var innerHTML = '<h3 class="header">'+linkForUpdate()+'</h3><br><div class="content" align="center">';
	if (height>150) {
		innerHTML += '<a id="incSB" class="button">Büyük</a> <a id="decSB" class="button">Küçük</a>';
		innerHTML += '<br><iframe align="center" name="speechbox" height="'+height+'" width="205" allowTransparency="true" frameborder="0" src="'+getShoutboxURL()+'"></iframe>';
	} else {
		innerHTML += '<a id="incSB" class="button">Sohbet</a>';
	};
	innerHTML += '</div><div class="footer"></div>';
	return innerHTML;
}

function setSBClickEvents() {
	document.getElementById("incSB").addEventListener("click", incSBheight, true);
	document.getElementById("decSB").addEventListener("click", decSBheight, true);
	GM_registerMenuCommand("Shoutbox-URL neu angeben", resetShoutboxURL);
}

function getSBboxAfter() {
	var boxAfter;
	if (boxAfter = document.getElementById('reportInboxLeft')) { return boxAfter };
	if (boxAfter = document.getElementById('viewMilitaryImperium')) {return boxAfter };
	if (boxAfter = document.getElementById('viewResearchImperium')) {return boxAfter };
	if (boxAfter = document.getElementById('viewDiplomacyImperium')) {return boxAfter };
	if (boxAfter = document.getElementById('viewCityImperium')) {return boxAfter };
	return document.getElementById('mainview'); // fallback
}

if (/speechbox/.exec(document.domain)) {
	var element;
	while (element = document.getElementById("werbung")) {
		while (!(element.tagName.toLowerCase()=='table')) {
			element = element.parentNode;
		};
		element.parentNode.removeChild(element);
	};
	element = document.getElementById("speech");
	element.parentNode.removeChild(element);
}
else {
	var boxAfter = getSBboxAfter();
	var box = document.createElement('div');
	box.className = 'dynamic';
	box.innerHTML = getSBinnerHTML();
	GM_addStyle( "iframe { margin: 10px 6px; }" );
	boxAfter.parentNode.insertBefore(box,boxAfter);
	setSBClickEvents();
}