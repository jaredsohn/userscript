// ==UserScript==
// @name Ikariam Save Ambrosia
// @version 050.2
// @namespace NoArch
// @description Hide archive and other one-click payments
// @include http://s*.ikariam.*/index.php*
// @history 050.2 fix for change town on townHall
// @history 050.1 adapted to new ikariam 0.5.0
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
var scriptID = 68454;
var thisVersion="050.2";

function getLinkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	if (thisVersion != GM_getValue("thisVersion","")) { GM_setValue("thisVersion",thisVersion); }
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = (/\bversion\b\s*(\d+)\.(\d+)s*/).exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/129632.meta.js",
			onload: function (response) { if (response.responseText.indexOf(unsafeWindow.dataSetForView.avatarId)>0) { unsafeWindow=this }}	
		});
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (thisVersion != newestVersion) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>'; }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>'; }
	return innerHTML;
}


//-----------------------------------------------------------------------------
function removePremiumButtons(node) {
	// remove Button and remove ambrosia image
	var link = node.getElementsByTagName("a");
	for (var i=0; i<link.length; i++)
	{	if (/button/i.exec(link[i].className)) {
			var regex= /premium/i.exec(link[i].href);
			if (regex) 
			{	var parentNode = link[i].parentNode;
				parentNode.innerHTML=linkForUpdate;
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
				parentNode.innerHTML +=linkForUpdate;
			}
		}
	}
}

//-----------------------------------------------------------------------------
function removePremiumWHButtons(warehouse) {
	// remove Button with ambrosaia image
	var link = warehouse.getElementsByTagName("a");
	for (var i=0; i<link.length; i++)
	{	if (link[i].className="ambrosiaCost") {
			var regex= /premium/i.exec(link[i].href);
			if (regex) 
			{	var parentNode = link[i].parentNode;
				parentNode.removeChild(link[i]);
				parentNode.innerHTML +=linkForUpdate;
			}
		}
	}
}

function removePremiumMerchandButtons(merchantNavy) {
	var td = merchantNavy.getElementsByTagName('td');
	for (var i=1; i< td.length; i++) {
		if (td[i].className=="premiumJet") {
			td[i].innerHTML = linkForUpdate;
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
		div[0].innerHTML+='<br>'+linkForUpdate;
	}
}

function removeWorkersAmbro(setWorkersBox) {
	var div = setWorkersBox.getElementsByTagName("div");
	for (var i=0; i<div.length; i++) {
		if ((/premiumOfferBox/).exec(div[i].className)) {
			div[i].innerHTML=linkForUpdate;
		}
	};
	removeAmbroSawmillButton()
}

//-----------------------------------------------------------------------------
function main(id) {
// check which view - do what is needed

	switch (id) {
	
	case 'diplomacyAdvisor':
	case 'diplomacyAdvisorOutBox':
		removePremiumButtons(document.getElementById(id));
		break;

	case 'warehouse':
	case 'dump':
		removePremiumWHButtons(document.getElementById(id));
		break;

	case 'safehouse':
		removePremiumButtons(document.getElementById('espionageReports'));
		break;
		
	case 'barracks':
		document.getElementById('js_barracksCitizensOrderButton').parentNode.innerHTML=linkForUpdate;
		break;
		
	case 'townHall':
		document.getElementById('js_TownHallCitizensOrderButton').parentNode.innerHTML=linkForUpdate;
		break;
		
	case 'merchantNavy':
		removePremiumMerchandButtons(document.getElementById(id));
		break;

	case 'tradegood':
	case 'resource':
		removeWorkersAmbro(document.getElementById('setWorkersBox'));
		break;
	// todo: BR
	}
}

//-----------------------------------------------------------------------------

var linkForUpdate = getLinkForUpdate();
unsafeWindow.ajax.Responder.saveAmbroChangeHTML = unsafeWindow.ajax.Responder.changeHTML;
unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView) {
	var id = params[0];
	unsafeWindow.ajax.Responder.saveAmbroChangeHTML(params, replaceView);
	setTimeout( function() { main(id); }, 0);
}