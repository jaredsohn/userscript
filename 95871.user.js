// ==UserScript==
// @name 		Ika Shoutbox
// @version		1.4
// @namespace	ikaSB
// @include	http://m*.ikariam.*
// @exclude	http://m*.ikariam.*/*?view=militaryAdvisorDetailedReportView*
// @exclude	http://m*.de.ikariam.*/index.php?detailedCombatId=*&view=militaryAdvisorDetailedReportView&combatRound=*
// @exclude	http://m*.ikariam.*/*?view=militaryAdvisorMilitaryMovements*
// @exclude	http://m*.ikariam.*/*?view=shipdescription*
// @exclude	http://m*.ikariam.*/*?view=unitdescription*
// @history	1.3 hidden SB does not appear on new selected town
// @history	1.2 no duplicated shoutbox in spam-banner
// @history	1.1 no shoutbox detailed BR (view a round)
// @history	1.0 updater can handle downtimes of userscripts.org
// @history	0.6 minor patches to speechbox.de
// @history	0.5 only hide for "view" and not "oldView"
// @history	0.3 no shoutbox in ikipedia units
// @history	0.3 no shoutbox in ikipedia ships
// @history	0.2 no shoutbox in detailed Battle Report
// @history	0.2 no shoutbox in military movements
// @history	0.1 initial release
// ==/UserScript==
// -- This part has been gathered from "Ocean Fill" GM utility
// -- Author was Victor Exsecrati - victorexsecrati at gmail dot com
// -- In case of rights problems, please, contact me
GM_addStyle("#city #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img252.imageshack.us/img252/5873/bgcontent1.jpg);text-align:left;}");
GM_addStyle("#city #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img252.imageshack.us/img252/3175/bgfooter1.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#island #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#island #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#worldmap_iso #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");
// -- End of "Ocean fill" part --

GM_addStyle("ul#chLi a { display: inline; color: #F00; font-size: 8pt;}");
GM_addStyle("table.gmm input { font-size: 0.8em; font-style: Arial, Helvetica, Verdana, sans-serif; }");
GM_addStyle("table.gmm th { text-align: center; }");
GM_addStyle("table.gmm0 { width: 200px; }");
GM_addStyle("table.gmm0 td { margin-left: 3px; vertical-align: top; }");

getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
  	  // alert(all[e].className);
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};

var defaultSBulr = 'http://kratos.freeshoutbox.net/';

// update part 
var scriptName = "Shoutbox"
var scriptID = 95871;
var thisVersion="1.4";

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
	if (needsUpdate) { innerHTML += scriptName + ' <b>neue Version '+newestVersion+'!</b></a>' }
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
};

function getShoutboxURL() {
	var url= GM_getValue(document.domain + "sbURL", "")
	if (url=="") {
		url = prompt("url zur Shoutbox:", defaultSBulr);
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
		innerHTML += '<a id="incSB" class="button">zwieksz</a> <a id="decSB" class="button">zmniejsz</a>';
		innerHTML += '<br><iframe align="center" name="shoutbox" height="'+height+'" width="205" allowTransparency="true" frameborder="0" src="'+getShoutboxURL()+'"></iframe>';
	} else {
		innerHTML += '<a id="incSB" class="button">Aktywuj</a>';
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

if (/ikariam/.exec(document.domain)) {
	var	view = document.getElementsByTagName("body")[0].id;
	if (view=="militaryAdvisorDetailedReportView" | 
		view=="militaryAdvisorMilitaryMovements" | 
		view=="shipdescription" | 
		view=="unitdescription") return;
	var boxAfter = getSBboxAfter();
	var box = document.createElement('div');
	box.className = 'dynamic';
	box.innerHTML = getSBinnerHTML();
	GM_addStyle( "iframe { margin: 10px 6px; }" );
	boxAfter.parentNode.insertBefore(box,boxAfter);
	setSBClickEvents();
}
else {
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