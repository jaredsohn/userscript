// ==UserScript==
// @name mIkariam Save Ambrosia
// @version m045.2
// @namespace mNoArch
// @description Hide archive and other one-click payments
// @include http://m*.ikariam.*/index.php*
// @history 045.2 removes spend ambrosia for sawmill buttons
// @history 045.1 removes deactivated speed button in merchant navy overview 
// @history 2.8 removes speed button in merchant navy overview (fixed 2.7)
// @history 2.6 removes citizen button in baracks
// @history 2.4 removes citizen button in townhall, script renamed
// @history 2.3 removes archive button for 0.4.2 spy reports
// @history 2.2 minor fix for warhoueses
// @history 2.1 changes for ikariam 0.4.2
// @history 2.0 updater can handle downtimes of userscripts.org
// @history 1.9 fix for users w/o ambrosia - just in case
// @history 1.8 fix for case mismatch
// @history 1.7 fix for battle report archive
// @history 1.6 fixes countdown
// @history 1.5 defuses battle report archive
// @history 1.4 fix for cargo view with active battles
// @history 1.3 defuses messages archive
// @history 1.2 defuses "preview cargo load", yet incomplete
// @history 1.1 defuses button (previous versions were ineffective), yet incomplete
// @history 1.0 update fixed, yet incomplete 
// @history 1.0 fixed spy lost message
// @history 0.1 initial release, yet incomplete
// ==/UserScript==

// update part 
var scriptName = "Save Ambrosia"
var scriptID = 133155;
var thisVersion="m045.2";
var update = "all" // change this if minor updates should be notified

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUp3dateCheck","0");
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
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

//-----------------------------------------------------------------------------
function noArchiveMovements() {
// hide the preview goods for foreign transports
	var table=document.getElementsByTagName("table");
	var notify;
	for (var t=0; t<table.length; t++)
	if (table[t].className=="locationEvents")
	{	var a=table[t].getElementsByTagName("a");
		for (var i=0; i<a.length; i++)
		{	if (/getFleetInfoForPremium/i.exec(a[i].href))
			{ a[i].parentNode.innerHTML=scriptName };
		};
		notify = table[t].parentNode;
	};
	if (notify) {
		var node = document.createElement('p');
		node.innerHTML = linkForUpdate();
		node.align = "right";
		notify.insertBefore(node,notify.firstChild);
	}
}

//-----------------------------------------------------------------------------
function removePremiumButtons(id) {
	// remove Button and remove ambrosia image
	var link = document.getElementById(id).getElementsByTagName("a");
	for (var i=0; i<link.length; i++)
	{	if (/button/i.exec(link[i].className)) {
			var regex= /premium/i.exec(link[i].href);
			if (regex) 
			{	var parentNode = link[i].parentNode;
				parentNode.innerHTML=linkForUpdate();
			}
		}
	}
}

//-----------------------------------------------------------------------------
function removePremiumButtonsClassName(aClassName) {
	// remove Button with ambrosaia image
	var link = document.getElementsByTagName("a");
	for (var i=0; i<link.length; i++)
	{	if (link[i].className==aClassName) {
			var regex= /premium/i.exec(link[i].href);
			if (regex) 
			{	var parentNode = link[i].parentNode;
				parentNode.removeChild(link[i]);
				parentNode.innerHTML +=linkForUpdate();
			}
		}
	}
}

//-----------------------------------------------------------------------------
function removePremiumWHButtons() {
	// remove Button with ambrosaia image
	var link = document.getElementById("mainview").getElementsByTagName("a");
	for (var i=0; i<link.length; i++)
	{	if (link[i].className!="plusteaser") {
			var regex= /premium/i.exec(link[i].href);
			if (regex) 
			{	var parentNode = link[i].parentNode;
				parentNode.removeChild(link[i]);
				parentNode.innerHTML +=linkForUpdate();
			}
		}
	}
}

function removePremiumMerchandButtons() {
	var table = document.getElementById("mainview").getElementsByTagName('table');
	for (var i=1; i< table.length; i++) {
		if (table[i].parentNode.parentNode.className=="premiumJet") {
			table[i].parentNode.parentNode.innerHTML = linkForUpdate();
		}
	}
}

function removeAmbroSawmillButton() {
	var donateWood2 = document.getElementById("donateWood2");
	if (donateWood2) {
		var div = donateWood2.parentNode.parentNode.getElementsByTagName("div");
		for (var i=0; i<div.length; i++) {
			var x = div[div.length-i-1];
			if (x.className!=="label") {
				x.parentNode.removeChild(x);
			};
		}
		div[0].innerHTML+='<br>'+linkForUpdate();
	}
}

//-----------------------------------------------------------------------------
function noAmain() {
// check which view - do what is needed
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {

	case "militaryAdvisorMilitaryMovements":
		noArchiveMovements();
		break;

	case "barracks":
		document.getElementById("cizitensOrderButton").parentNode.parentNode.innerHTML=linkForUpdate();
		break;

	case "townHall":
		document.getElementById("cizitensOrderButton").parentNode.innerHTML=linkForUpdate();
		break;

	case "safehouse":
	case "safehouseReports":
		removePremiumButtons("espionageReports");
		break;

	case "merchantNavy":
		removePremiumMerchandButtons();
		break;

	case "diplomacyAdvisor":
	case "diplomacyAdvisorOutBox":
		removePremiumButtons("deleteMessages");
		break;

	case "resource":
		removeAmbroSawmillButton();
	case "tradegood":
		var node = document.getElementById("setWorkersBox").getElementsByTagName('table')[0];
		node.innerHTML=linkForUpdate();
		node.className="";
		break;

	case "warehouse":
	case "dump":
		removePremiumWHButtons();
		break;

	case "militaryAdvisorReportView":
		removePremiumButtonsClassName("button");
		break;
	}
}

//-----------------------------------------------------------------------------
noAmain();