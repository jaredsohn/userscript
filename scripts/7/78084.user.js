// ==UserScript==
// @name	Zaqwer's Mapping and Stocking Logger
// @namespace	http://pardusmap.mhwva.net/
// @description	Real-time Mapping and Stocking Script for the Pardus Universe
// @include	http://*.pardus.at/*
// @include	https://*.pardus.at/*
// @include	http://pardusmap.mhwva.net/*
// @match	http://*.pardus.at/*
// @match	https://*.pardus.at/*
// @match	http://pardusmap.mhwva.net/*
// @author	Nhyujm@Orion.Pardus.at
// @author	Cpt Zaq@Artemis.Pardus.at
// @author	Zaqwer@Pegasus.Pardus.at
// @grant	none
// @version	6.6
// ==/UserScript==

// == Notes ==
//
// Version 6.6 Fixed Error on NPC Starbase Info Screen
// Version 6.5 Fixed Planet and Starbase Info and Trading for all buildings. Nav Data doesn't update while in Ambush now.
// Version 6.4 Fixed Building Index Problem When being shwon NPC Planets and SBs
// Version 6.3 Fixed NPC not going away bug
// Version 6.2 Rewrote Nav Screen Capture using new Class Tags
// Version 6.1 Fixed Building Stock Bug after Pardus Changes
// Version 6.0 Changed Nav Data Import
// Version 5.9 Fixed Cloaking Bug
// Version 5.8 Fixed issues with WHMs, XHMs, and YHMs, and Pointed to new Domain.
// Version 5.7 Fixed minor bug getting user location on map
// Version 5.6 Fixed a few Typos and missed site changes.
// Version 5.5 Moved Site to New Host
// Version 5.4 Fixed Bug in WH identification and some script optimization
// Version 5.3 Added https support and easier ability to have script startup active or inactive
// Version 5.2 Fixed odd error when viewing Missions
// Version 5.1 Fixed Errors with War Missions
// Version 5.0 Fixed Compatablity Bug with Pardus Trade Calulator
// Version 4.9 Fixed Added Free Space update for Building Index.
// Version 4.8 Fixed stupid typo bugs.
// Version 4.7 Fixed Possible Bug found by Ratchetfreek
// Version 4.6 Implemented Ratchetfreak's idea for hijacking the AJAX Function and fixing getUserLoc
// Version 4.5 Fixed to work with new AJAX Calls
// Versoin 4.4 Fixed Bug to fix random energy tiles on map and map not updating new buildings.
// Version 4.3 Added 2nd Icon in Msg Bar to allow Building Overview info from DB to be
//			Displayed on the Nav screen when hovering the mouse of a building or NPC
// Version 4.2 Added Icon in Msg Bar to deactivate Logger
// Version 4.1 Added in functionality to Grab Crew Info from Planets
//		Added in functionality to grab Ship For Sale info from SBs and Planets
// Version 4.0 Fixed a bug I created while Fixing the Bug for the FF Coords Addon
//			Added Links to my Map on the Sector Name and Coords
//			Fixed Bug with Transport VIP Missions
//			Fixed Bug with 2 TSS Long Term Missions
// Version 3.9 Updated script to allow remote updating of Prices and Stocks for Buildings
// Version 3.8 Updated script mainMap function to work with Coords Addon for FF
// Version 3.7 Added userID collection to allow for name changes without having to create new account
// Version 3.6 Added in functionality to Grab Equipment Info from Starbases and Building info from Overview Screen
//		 Changed import script names on server to help troubleshooting 
// Version 3.5 Updated script for new "ID" tags add by Pardus Devs added in a Testing Flag to send data to Test Site
// Version 3.4 Fixed a bug for FF 3.6 and background Images
// Version 3.3 Fixes the disappearing Wormhole Bug
// Version 3.2 Fixed Bug in Ship Combat with DC and OC
// Version 3.15 Removed Pesky Alerts and finialized Mission information.
// Version 3.1 Added individual controls for each uni and updated mission collection
// Version 3.0 New Host information Added
// Version 2.8 Added in Cookies to hold Persistant Data
// Version 2.7 Added Ability to Grab NPC info from Fights
// Version 2.6 Added Version to all Data being sent
// Version 2.5 Added Ability to Grab Sector Building Index Page
// Version 2.4 Fixed a typo for images
// Version 2.3 Added Alert to Update when visiting main page of web site
// Version 2.2 Fixed Missed Code from 2.1
// Version 2.1 Fixed Issue for those using Image Packs (Thought fixed in 1.1)
// Version 2.0 Grabbing more info from Building Trade to counteract people bypassing building info page
// Version 1.9 Adding in abiltiy to see who is using the extension DOES NOT TRANSMIT USERS POSITION
// Version 1.8 Fixed Bug when visiting player buildings who are in a faction but not an alliance
// Version 1.7 Fixed another image bug and grabbing info from own buildings
// Version 1.6 Fixed bug in code on grabbing images again
// Version 1.5 Added code for future support of Artemis and Pegasus
// Version 1.4 Added ability to get Fly Close info for SBs, Grab Squadron Page
// Version 1.3 Fixed Alert Box popping up when visiting own buildings with no commodities or stock.
// Version 1.2 Fixed Bug visiting getting images when visiting Neutral Planets
// Version 1.1 Fixed problem with Image Pack usage.
// Version 1.0 Fixed and cleaned up Code
//
// == End Notes ==

// == User Options ==
// use this section to turn portions of the mapper on and off by changing the values between 'true' and 'false'
//
var autostart = true;
var enableArtemis = true;
var enableOrion = true;
var enablePegasus = true;

var enableSectorLink = true;
var enableCoordsLink = true;

var enableArtemisBuildingInformation = true;
var enableArtemisBuildingIndex = true;
var enableArtemisNPCInformation = true;
var enableArtemisMissionInformation = true;
var enableArtemisSquadronInformation = true;
var hideArtemisIllegalBuildings = false;
var hideArtemisMilitaryBuildings = false;

var enableOrionBuildingInformation = true;
var enableOrionBuildingIndex = true;
var enableOrionNPCInformation = true;
var enableOrionMissionInformation = true;
var enableOrionSquadronInformation = true;
var hideOrionIllegalBuildings = false;
var hideOrionMilitaryBuildings = false;

var enablePegasusBuildingInformation = true;
var enablePegasusBuildingIndex = true;
var enablePegasusNPCInformation = true;
var enablePegasusMissionInformation = true;
var enablePegasusSquadronInformation = true;
var hidePegasusIllegalBuildings = false;
var hidePegasusMilitaryBuildings = false;
// == End User Options ==

var debug = false;
var testing = false;

/*global window: false, opera: false */

function createCookie(name,value) {
	document.cookie = name + "=" + value + "; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0;i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') { c = c.substring(1,c.length); }
		if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length,c.length); }
	}
	return null;
}
function largeAlert() {
	var box = document.getElementById('debugAlert');
	if (box.style.height == '40px') {
		box.style.height='300px';
	} else {
		box.style.height='40px';
	}
}
function removeAlert() {
	if (document.getElementById('debugAlert')) { 
		var box = document.getElementById('debugAlert');
		box.parentNode.removeChild(box);
	}
}
function debugAlert(message) {
	var divtag = document.createElement('div');
	divtag.id = 'debugAlert';
	divtag.style.width='600px';
	divtag.style.height='40px';
	divtag.style.position='fixed';
	divtag.style.left='0px';
	divtag.style.right='0px';
	divtag.style.bottom='0px';
	divtag.style.margin='0px auto';
	divtag.style.border='2px solid #823C3A';
	divtag.style.borderBottomWidth='0px';
	divtag.style.backgroundImage="url(data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%01%08%06%00%00%00%1F%15%C4%89%00%00%00%2BtEXtCreation%20Time%00%8Cr%2030%20wrz%202009%2017%3A12%3A41%20%2B0100%BD1W%A9%00%00%00%07tIME%07%D9%09%1E%10%09%0C%80a%F1%88%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%0DIDATx%DAc%B0%94%97%7F%0A%00%02i%01%5D%BB%02N%CC%00%00%00%00IEND%AEB%60%82)";
	divtag.style.padding='5px';
	divtag.style.color='#CFCCBD';
	divtag.style.zIndex= 100;
	if (message.replace) { divtag.textContent=message.replace(RegExp('(<wbr>)','g'),''); }
	divtag.innerHTML=message;
	divtag.addEventListener('mouseover', function () { largeAlert(); }, false);
	divtag.addEventListener('mouseout', function () { largeAlert(); }, false);
	divtag.addEventListener('click', function () { removeAlert(); }, false);
	document.body.appendChild(divtag);
}
function XMLHttpComm() {
	var httpRequest;
	if (window.opera) {
		httpRequest = new opera.XMLHttpRequest();
	} else {
		httpRequest = new XMLHttpRequest();
	}

	var thisObject = this;
	
	this.CallBack = function() { return; };
	this.readyState = function() { return httpRequest.readyState; };
	this.status = function() { return httpRequest.status; };
	this.responseText = function() { return httpRequest.responseText; };
	this.HttpRequest = function() { return httpRequest; };
	
	this.Post = function(url, postData)
	{
		if (postData === undefined) { return; }
		httpRequest.onreadystatechange = thisObject.CallBack;
		if (debug) {debugAlert(url + "?uni=" + readCookie('uni') + "&" + postData); }
		postData = postData.replace(RegExp('(<wbr>)','g'),'');
		httpRequest.open("GET", url+"?uni=" + readCookie('uni') + "&" + postData, true);
		httpRequest.send(null);
	};
	
	this.RetrieveCommsResponse = function()
	{
		//readyState of 4 represents that data has been returned 
		if (httpRequest.readyState === 4)
		{
			if (httpRequest.status === 200)
			{
				//alert(httpRequest.responseText);
			}
			else
			{
				//alert(httpRequest.status + " : " + httpRequest.responseText);
			}
		}
	};
}

function getUserLoc(doc) {
	// Ok We have set the Server lets double check that we did it right
	if (readCookie('server') !== null && (readCookie('uni').match('Orion') || readCookie('uni').match('Artemis') || readCookie('uni').match('Pegasus'))) {
		// Lets Find out your Current Location in the Padusian Universe
		var script = doc.getElementsByTagName('script');
		for (var i=0;i < script.length;i++) {
			if (script[i].innerHTML.match(/userloc =/)) {
				var scr = script[i].innerHTML;
				scr = scr.substring(scr.lastIndexOf('userloc =')+10);
				scr = scr.substring(0,scr.indexOf(';'));
				createCookie('userloc',parseInt(scr,10));
				break;
			}
		}
	}
}

function getUserId(doc) {
	// Ok We have set the Server lets double check that we did it right
	if (readCookie('server') !== null && (readCookie('uni').match('Orion') || readCookie('uni').match('Artemis') || readCookie('uni').match('Pegasus'))) {
		// Lets Find out your Current Location in the Padusian Universe
		if (doc.getElementsByTagName('script')[0]) {
			var scr = doc.getElementsByTagName('script')[0].innerHTML;
			scr = scr.substring(scr.lastIndexOf('=')+1,scr.lastIndexOf(';'));
			createCookie('userid',parseInt(scr,10));
		}
	}

}

function trim(str) {
	return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ");
}

function messageFrame(doc) {
	try {
		// Well we only need to do this the first time you log in so lets check if you have already set a Cookie
		if (readCookie('user') === null) {
			getUserId(doc);

			var user = doc.getElementById("universe").title;
			createCookie('user',user.substring(user.indexOf(":") + 2));
			var browser = navigator.userAgent;
				
			// Great We got all the info we need lets send it to the DB
			var postData = "el=1&id=" + readCookie('userid') + "&user=" + readCookie('user') + "&version=" + readCookie('currentVersion') + "&browser=" + browser;
			//alert(postData);
			var httpRequest = new XMLHttpComm();
			httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
			httpRequest.Post(readCookie('server') + "extensionloaded.php", postData);
		}
	} catch(ex) { debugAlert(ex); }
}
function overviewStats(doc) {
	try {
		var faction = null;
		var syndicate = null;
		var comp = null;
		var rank = null;
		var img = null;
		if (doc.getElementById('faction')) {
			img = doc.getElementById('faction').src;
			faction = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1).replace('64','16').replace('64','16');
			createCookie('faction',faction);
		}
		if (doc.getElementById('syndicate')) {
			img = doc.getElementById('syndicate').src;
			syndicate = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1).replace('64','16').replace('64','16');
			createCookie('syndicate',syndicate);
		}
		if (doc.getElementById('competency_current')) {
			img = doc.getElementById('competency_current').src;
			comp = img.substring(img.indexOf('rank')+4,img.indexOf('.png'));
			createCookie('comp',comp);
		}
		if (doc.getElementById('milrank_current')) {
			img = doc.getElementById('milrank_current').src;
			rank = img.substring(img.indexOf('rank')+4,img.indexOf('.png'));
			createCookie('rank',rank);
		}
		var postData = "lud=1&user=" + readCookie('user') + "&version=" + readCookie('currentVersion');
		postData += "&faction=" + faction + "&syndicate=" + syndicate;
		postData += "&comp=" + comp + "&rank=" + rank;
			
				
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "extensionloaded.php", postData);
	} catch (ex) { debugAlert(ex); }
}

function mainMap(doc,enableSectorLink,enableCoordsLink) {
	var unsafeWindow = this['unsafeWindow'] || window;
	if (unsafeWindow.checkToDo !== undefined) {
		var local_checkToDo = unsafeWindow.checkToDo;
		unsafeWindow.checkToDo = function() {
			local_checkToDo();
			removeAlert();
			removeAlert();
			getNavData(doc,enableSectorLink,enableCoordsLink);
		}
	}
	getNavData(doc,enableSectorLink,enableCoordsLink);
}
function getNavData(doc,enableSectorLink,enableCoordsLink) {
	// We are now at the Nav Screen
	var postData = "";
	var nav = "";
	var httpRequest = "";
	var uni = readCookie('uni');
	var nav_div = doc.getElementById('nav');
	if (readCookie('show_over') === 'true') {
		var s = document.createElement('script');
		s.type = "text/javascript";
		var stext = "function display_overview(uni,id) {\n"
			+ "	function getXMLHttpObject() {\n"
			+ "		if (window.opera) {\n"
			+ "			return new opera.XMLHttpRequest();\n"
			+ "		} else {\n"
			+ "			if (window.XMLHttpRequest) {\n"
			+ "				return new XMLHttpRequest();\n"
			+ "			}\n"
			+ "			if (window.ActiveXObject) {\n"
			+ "				return new ActiveXObject('Microsoft.XMLHTTP');\n"
			+ "			}\n"
			+ "		}\n"
			+ "		return null;\n"
			+ "	}\n"
			+ "	var url = 'http://pardusmap.mhwva.net/info/pardus_overview_info.php';\n"
			+ "	url += '?uni=' + uni + '&id=' + id;\n"
			+ "	var overviewhttp = getXMLHttpObject();\n"
			+ "	overviewhttp.open('GET',url,true);\n"
			+ "	overviewhttp.onreadystatechange = function () {\n"
			+ "		if (overviewhttp.readyState == 4) {\n"
			+ "			document.getElementById('zaqwer_overview').innerHTML = overviewhttp.responseText;\n"
			+ "		} else {\n"
			+ "			document.getElementById('zaqwer_overview').style.visibility = 'visible';\n"
			+ "		}\n"
			+ "	}\n"
			+ "	overviewhttp.send(null);\n"
			+ "}\n"
			+ "function closeWindow() {\n"
			+ "	document.getElementById('zaqwer_overview').innerHTML = '<img src=\"http://pardusmap.mhwva.net/images/ajax-loader.gif\" />';\n"
			+ "	document.getElementById('zaqwer_overview').style.visibility = 'hidden';\n"
			+ "}\n";
		s.appendChild(document.createTextNode(stext));
		doc.getElementsByTagName("head")[0].appendChild(s);
	
		var overview_div = document.createElement('div');
		overview_div.id = "zaqwer_overview";
		overview_div.style.position = 'absolute';
		overview_div.style.border = "2";
		overview_div.style.right = '3px';
		overview_div.style.backgroundImage = 'url("http://static.pardus.at/img/std/bgoutspace1.gif")';
		overview_div.style.zIndex = '100';
		overview_div.innerHTML = '<img src="http://pardusmap.mhwva.net/images/ajax-loader.gif" />';
		overview_div.style.visibility = 'hidden';
		
		var p = doc.getElementById('cargo').nextSibling.nextSibling.nextSibling;
		p.parentNode.insertBefore(overview_div,p);
	}
	try { 
		// Set a few Cookies with location information
		createCookie('sector',doc.getElementById('status_content').getElementsByTagName('span')[0].textContent);
		if (enableSectorLink) { doc.getElementById('status_content').getElementsByTagName('span')[0].innerHTML = '<a target="_blank" href="http://pardusmap.mhwva.net/' + readCookie('uni') + '/' + readCookie('sector') + '">' + readCookie('sector') + '</a>'; }
		var coords = doc.getElementById('status_content').getElementsByTagName('span')[1].textContent;
		createCookie('x',coords.substring(1,coords.indexOf(',')));
		createCookie('y',coords.substring(coords.indexOf(',')+1,coords.indexOf(']')));
		if (enableCoordsLink) { doc.getElementById('status_content').getElementsByTagName('span')[1].innerHTML = '<a target="_blank" href="http://pardusmap.mhwva.net/' + readCookie('uni') + '/' + readCookie('sector') + '/' + readCookie('x') + '/' + readCookie('y') + '">' + coords + '</a>'; }
		// Are we flying close to a SB
		var flyclose = 0;
		var unsafeWindow = this['unsafeWindow'] || window;
		//alert(unsafeWindow.navAreaSize);
		//alert(unsafeWindow.fieldsTotal);
		createCookie('userloc',unsafeWindow.userloc);
		//bg_links = doc.getElementsByClassName('navClear');
                if (nav_div && nav_div.style.display.match(/none/)) {
			nav_div = doc.getElementById('navtransition');
		} else {
			nav_div = doc.getElementById('navarea');
		}
		
		postData = "version=" + readCookie('currentVersion') + "&user=" + readCookie('user') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&s=" + readCookie('sector') + "&mapdata=";
		var middle = "tdNavField" + Math.floor(unsafeWindow.fieldsTotal/2);
		
		var fg_list = ['navBuilding','navNpc','navStarbase','navPlanet','navClear','navShip'];
		for (x in fg_list) {
			var fg_links = nav_div.getElementsByClassName(fg_list[x]);
			for (var i=0;i < fg_links.length;i++) {
				if (fg_links[i].id == middle) {
					var nav = readCookie('userloc');
				} else {
					var nav = fg_links[i].getElementsByTagName('a')[0].getAttribute('onclick');
					nav = nav.substring(nav.indexOf('(') + 1,nav.indexOf(')'));
				}
				var fg = fg_links[i].getElementsByTagName('img')[0].src;
				fg = fg.substring(fg.lastIndexOf('/',fg.lastIndexOf('/')-1)+1);
				postData += "<wbr>~" +  parseInt(nav,10) + "," + fg;
				if (readCookie('show_over') === 'true') {
					fg_links[i].setAttribute('onmouseover','display_overview(\'' + uni + '\',' + parseInt(nav,10) + ')');
					fg_links[i].setAttribute('onmouseout','closeWindow()');
				}
			}
		}
		var wh_links = nav_div.getElementsByClassName('navWormhole');
		for (var i=0;i < wh_links.length;i++) {
			var target = "unknown";
			if (wh_links[i].id == middle) {
				var nav = readCookie('userloc');
				target = doc.getElementById('aCmdWarp').getElementsByTagName('b')[0].textContent.replace("Jump to ","");
			} else {
				var nav = wh_links[i].getElementsByTagName('a')[0].getAttribute('onclick');
				nav = nav.substring(nav.indexOf('(') + 1,nav.indexOf(')'));
			}
			var fg = wh_links[i].getElementsByTagName('img')[0].src;
			fg = fg.substring(fg.lastIndexOf('/',fg.lastIndexOf('/')-1)+1);
			postData += "<wbr>~" +  parseInt(nav,10) + "," + fg + "," + target;
		}
		postData += "&id=" + readCookie('userloc');
		//alert(postData);
		httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		if(doc.getElementById('aCmdAmbushSettings') != null);
		if (flyclose) {
			httpRequest.Post(readCookie('server') + "importstarbasemap2.php", postData);
		} else {
			if(doc.getElementById('aCmdAmbushSettings') == null) {
				httpRequest.Post(readCookie('server') + "importmap2.php", postData);
			}
		}
	}
	catch(ex) { debugAlert(ex); }
}
function buildingInformation(doc,hideIllegalBuildings,hideMilitaryBuildings) {
	try {
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&building=1";
			
		var tbl = doc.getElementsByTagName('table')[2];
		// Get Building Name
		var name = tbl.getElementsByTagName('b')[0].textContent;
		postData += "&name=" + name;
		if (hideIllegalBuildings && (name.match('Drug Station') || name.match('Slave Camp') || name.match('Dark Dome'))) { return; }
		if (hideMilitaryBuildings && (name.match('Military Outpost') || name.match('Alliance Command'))) { return; }
		// Get Building Image
		var img = tbl.getElementsByTagName('img')[0].src;
		img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
		postData += "&img=" + img;
	
		var links = tbl.getElementsByTagName('a');
		if (tbl.getElementsByTagName('th')[0] !== undefined) {
			postData += "&owner=" + links[0].textContent;
			if (tbl.getElementsByTagName('img')[2].src.match("factions/")) {
				var fac = tbl.getElementsByTagName('img')[2].src;
				fac = fac.substring(fac.lastIndexOf('/',fac.lastIndexOf('/')-1)+1);
				postData += "&faction=" + fac;
			}
			if (links[1].pathname.match('alliance')) {
				postData += "&alliance=" + links[1].textContent;
			}
			if (tbl.getElementsByTagName('img')[3].src.match("sign_eps")) {
				var eps = tbl.getElementsByTagName('img')[3].src;
				postData += "&syndicate=" + eps.substring(eps.lastIndexOf('/',eps.lastIndexOf('/')-1)+1);
			}
		} else {
			var bld = tbl.getElementsByTagName('b')[1].textContent;
			if (bld.match("Union")) { postData += "&faction=factions/sign_uni_16x16.png"; }
			else if (bld.match("Federation")) { postData += "&faction=factions/sign_fed_16x16.png"; }
			else if (bld.match("Empire")) { postData += "&faction=factions/sign_emp_16x16.png"; }
		}
		// Get Building Condition
		postData += "&condition=" + tbl.getElementsByTagName('table')[0].getElementsByTagName('td')[0].getAttribute('width');

		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		if (img.match("sb_")) { 
			postData += "&sbb=1";
			httpRequest.Post(readCookie('server') + "importstarbaseinfo.php", postData); 
		}
		else {httpRequest.Post(readCookie('server') + "importothersbuildinginfo.php", postData); }
	}
	catch(ex) { debugAlert(ex); }
}
function planetInformation(doc) {
	try {
		var img = "";
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&planet=1";
		if (doc.getElementsByTagName('table')[3].getElementsByTagName('td')[0].getElementsByTagName('img').length == 2) {
			img = doc.getElementsByTagName('table')[3].getElementsByTagName('td')[0].getElementsByTagName('img')[0].src;
			postData += "<wbr>&faction=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			img = doc.getElementsByTagName('table')[3].getElementsByTagName('td')[0].getElementsByTagName('img')[1].src;
			postData += "<wbr>&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
		} else {
			img = doc.getElementsByTagName('table')[3].getElementsByTagName('td')[0].childNodes[0].src;
			postData += "<wbr>&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
		}
		postData += "<wbr>&name=" + doc.getElementsByTagName('table')[3].getElementsByTagName('td')[1].childNodes[0].textContent;
		var node = doc.getElementsByTagName('table')[3].nextSibling.childNodes[3].childNodes[0];
		var pop = node.textContent;
		postData += "<wbr>&pop=" + trim(pop.substring(pop.indexOf(':') + 2,pop.indexOf('|')).replace(",",""));
		postData += "<wbr>&crime=" + trim(node.childNodes[1].textContent).replace(",","");
		
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importplanetinfo.php", postData);
	}
	catch(ex) { debugAlert(ex); }
}
function starbaseInformation(doc) {
	try {
		var img = "";

		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&sb=1";
		// Get List of All Tables
		var tbl = doc.getElementsByTagName('table');
		
		//Get the Name of the SB
		postData += "<wbr>&name=" + tbl[3].getElementsByTagName('span')[0].textContent;
		if (doc.getElementsByTagName('th')[0] !== undefined && doc.getElementsByTagName('th')[0].textContent.match("Commanded by")) {
			//Player Owned SB
			img = tbl[3].getElementsByTagName('img')[1].src;
			postData += "<wbr>&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			// Is Player part of a Faction
			if (tbl[4].getElementsByTagName('img')[0] !== undefined) {
				img = tbl[4].getElementsByTagName('img')[0].src;
				postData += "<wbr>&faction=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			}
			var links = tbl[4].getElementsByTagName('a');
			// Is Player part of an Alliance
			if (links.length == 2) { 
				postData += "<wbr>&alliance=" + links[1].textContent; 
			}
			postData += "<wbr>&owner=" + links[0].textContent;
			var node = tbl[4].nextSibling.childNodes[3].childNodes[0];
			var pop = node.textContent;
			postData += "<wbr>&pop=" + trim(pop.substring(pop.indexOf(':') + 2,pop.indexOf('|')).replace(",",""));
			postData += "<wbr>&crime=" + trim(node.childNodes[1].textContent).replace(",","");
		} else {
			if (tbl[3].getElementsByTagName('img').length == 2) { 
				img = tbl[3].getElementsByTagName('img')[0].src;
				postData += "<wbr>&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1); 
			} else { 
				img = tbl[3].getElementsByTagName('img')[1].src;
				postData += "<wbr>&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
				img = tbl[3].getElementsByTagName('img')[0].src;
				postData += "<wbr>&faction=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			}
			var node = tbl[3].nextSibling.childNodes[3].childNodes[0];
			var pop = node.textContent;
			postData += "<wbr>&pop=" + trim(pop.substring(pop.indexOf(':') + 2,pop.indexOf('|')).replace(",",""));
			postData += "<wbr>&crime=" + trim(node.childNodes[1].textContent).replace(",","");
		}
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importstarbaseinfo.php", postData);
	}
	catch(ex) { debugAlert(ex); }
}
function buildingTrade(doc,hideIllegalBuildings,hideMilitaryBuildings) {
	try {
		//var postData = "version=" + readCookie('currentVersion') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&loc=" + readCookie('userloc');
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		if (doc.getElementsByName('building_trade')[0] === undefined) { return; }
		var tbl = doc.getElementsByTagName('table')[2];
		// Get Building Name
		var name = tbl.getElementsByTagName('a')[0].textContent;
		postData += "&name=" + tbl.getElementsByTagName('a')[0].textContent;
		if (hideIllegalBuildings && (name.match('Drug Station') || name.match('Slave Camp') || name.match('Dark Dome'))) { return; }
		if (hideMilitaryBuildings && (name.match('Military Outpost') || name.match('Alliance Command'))) { return; }
		// Get Building Image
		var img = tbl.getElementsByTagName('img')[0].src;
		img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			
		postData += "&img=" + img;
		postData += "&bt=";

		var traderows = doc.getElementsByName('building_trade')[0].getElementsByTagName('table')[3].getElementsByTagName('tr');
		var shiprows = doc.getElementsByName('building_trade')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
		for (var i = 1; i < traderows.length; i++) {
			var td = traderows[i].getElementsByTagName('td');
			var std = shiprows[i].getElementsByTagName('td');
			if (td.length == 7) {
				//Resource
				postData += "<wbr>~" + td[1].textContent.replace(",","") + ",";
				//Amount
				postData += td[2].textContent.replace(",","") + ",";
				//Min
				postData += td[3].textContent.replace(",","") + ",";
				//Max
				postData += td[4].textContent.replace(",","") + ",";
				//Trader Buys
				postData += td[5].textContent.replace(",","") + ",";
				//Trader Sells
				postData += std[3].textContent.replace(",","");
			}
		}
		var fs = traderows[traderows.length-2].getElementsByTagName('td')[1].textContent;
		postData += "<wbr>&fs=" + fs.substring(0,fs.length-1);
		postData += "&credit=" + traderows[traderows.length-1].getElementsByTagName('td')[1].textContent.replace(",","").replace(",","").replace(",","");
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importothersbuildinginfo.php", postData);
	}
	catch(ex) { debugAlert(ex); }
}
function planetTrade(doc) {
	try {
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&pt=";
		var buyrows = doc.getElementsByName('planet_trade')[0].getElementsByTagName('table')[3].getElementsByTagName('tr');
		var sellrows = doc.getElementsByName('planet_trade')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
		for (var i = 1; i < buyrows.length; i++) {
			var btd = buyrows[i].getElementsByTagName('td');
			var std = sellrows[i].getElementsByTagName('td');
			if (btd.length == 7) {
				//Resource
				postData += "<wbr>~" + btd[1].textContent.replace(",","") + ",";
				//Amount
				postData += btd[2].textContent.replace(",","") + ",";
				//Bal
				postData += btd[3].textContent.replace(",","") + ",";
				//Max
				postData += btd[4].textContent.replace(",","") + ",";
				//Trader Buys
				postData += btd[5].textContent.replace(",","") + ",";
				//Trader Sells
				postData += std[3].textContent.replace(",","");						
			}
		}
		postData += "<wbr>&credit=" + buyrows[buyrows.length-1].cells[1].textContent.replace(",","").replace(",","").replace(",","");
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importplanetinfo.php", postData);
	}
	catch(ex) { debugAlert(ex); }
}
function starbaseTrade(doc) {
	try {
		//var postData = "version=" + readCookie('currentVersion') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&loc=" + readCookie('userloc');
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		if (doc.getElementsByName('starbase_trade')[0] === undefined) { return; }
		var buyrows = doc.getElementsByName('starbase_trade')[0].getElementsByTagName('table')[3].getElementsByTagName('tr');
		var sellrows = doc.getElementsByName('starbase_trade')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
		postData += "&sbt="; 
		var btd_h = buyrows[0].getElementsByTagName('th');
		for (var i = 1; i < buyrows.length; i++) {
			var btd = buyrows[i].getElementsByTagName('td');
			var std = sellrows[i].getElementsByTagName('td');
			if (btd.length >= 5) {
				var r = 1;
				//Resource
				postData += "<wbr>~" + btd[r++].textContent.replace(",","") + ",";
				//Amount
				postData += btd[r++].textContent.replace(",","") + ",";
				//Bal
				postData += btd[r++].textContent.replace(",","") + ",";
				if (btd_h[3].textContent.match('Min')) {
					//Min
					postData += btd[r++].textContent.replace(",","") + ",";
				} else {
					//Min
					postData += "0,";
				}
				//Max
				postData += btd[r++].textContent.replace(",","") + ",";
				//Trader Buys
				postData += btd[r++].textContent.replace(",","") + ",";
				// Trader Sells
				postData += std[3].textContent.replace(",","");
			}
		}
		if (buyrows[buyrows.length-2].getElementsByTagName('td')[1] !== undefined ) {
			var fs = buyrows[buyrows.length-2].getElementsByTagName('td')[1].textContent.replace(",","");
			postData += "<wbr>&fs=" + fs.substring(0,fs.length-1);
		}
		postData += "<wbr>&credit=" + buyrows[buyrows.length-1].cells[1].textContent.replace(",","").replace(",","").replace(",","");
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importstarbaseinfo.php", postData);
	}
	catch(ex) { debugAlert(ex); }
}
function buildingManagement(doc,hideIllegalBuildings,hideMilitaryBuildings) {
	try {
		var fs = 0;
		var i = 0;
		var td;
		var tbl = doc.getElementsByTagName('table');
		//var postData = "version=" + readCookie('currentVersion') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&loc=" + readCookie('userloc');
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
			
		var img = tbl[2].getElementsByTagName('img')[0].src;
		postData += "&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
		var name = tbl[2].getElementsByTagName('b')[0].textContent;
		postData += "&name=" + name;

		if (hideIllegalBuildings && (name.match('Drug Station') || name.match('Slave Camp') || name.match('Dark Dome'))) { return; }
		if (hideMilitaryBuildings && (name.match('Military Outpost') || name.match('Alliance Command'))) { return; }
		
		if (img.match('/sb_')) {
			var cond = tbl[2].getElementsByTagName('b')[1].textContent;
			postData += "&condition=" + cond.substring(cond.indexOf("condition: ","")+11);
			postData += "&sbb=1";
		} else if (tbl[2].getElementsByTagName('b')[0].textContent == "Trading Outpost") {
			fs = tbl[2].getElementsByTagName('b')[1].textContent;
			postData += "&fs=" + parseInt(fs.substring(fs.lastIndexOf('ding: ')+6,fs.length-1),10);
			postData += "&bm=";
				
			if (doc.getElementsByName('building_man')[0].parentNode.parentNode.parentNode.getElementsByTagName('table')[3] !== undefined) {
				var stockrows = doc.getElementsByName('building_man')[0].parentNode.parentNode.parentNode.getElementsByTagName('table')[3].getElementsByTagName('tr');
				for (i = 1;i < stockrows.length;i++) {
					td = stockrows[i].getElementsByTagName('td');
					//Resource
					postData += "<wbr>~" + td[1].textContent;
					//Amount
					postData += "," + td[2].textContent;
				}
			}
		} else {
			if (name != "Military Outpost") {
				var lpostData = postData + "&level=";
				var temp = tbl[5].getElementsByTagName('td')[0];
				lpostData += temp.getElementsByTagName('img')[0].alt + ",";
				lpostData += temp.textContent.replace(": ","");
				//alert(lpostData);
				var lhttpRequest = new XMLHttpComm();
				lhttpRequest.CallBack = lhttpRequest.RetrieveCommsResponse;
				lhttpRequest.Post(readCookie('server') + "importbuildinginfo.php", lpostData);
			}
			//Get Buildings Free Space
			fs = tbl[2].getElementsByTagName('b')[2].textContent;
			postData += "&fs=" + parseInt(fs.substring(fs.lastIndexOf('ding: ')+6,fs.length-1),10);
			postData += "&bm=1";
				
			var stock = tbl[10];
			var comms = tbl[11];
				
			if (stock) {
				for (i = 1;i < stock.getElementsByTagName('tr').length;i++) {
					td = stock.getElementsByTagName('tr')[i].getElementsByTagName('td');
					postData += '<wbr>&' + td[1].textContent + "=";
					postData += td[2].textContent;
				}
			}	
			if (comms) {
				for (i = 1;i < comms.getElementsByTagName('tr').length;i++) {
					td = comms.getElementsByTagName('tr')[i].getElementsByTagName('td');
					postData += '<wbr>&' + td[1].textContent + "=";
					postData += td[2].textContent;
				}
			}
		}
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importownbuildinginfo.php", postData);
	} catch(ex) { debugAlert(ex); }
}
function buildingTradeSettings(doc,hideIllegalBuildings,hideMilitaryBuildings) {
	try {
		var postData = "version=" + readCookie('currentVersion') + "&loc=";
		var tbl = doc.getElementsByTagName('table')[3];
		// If we are viewing this remotely we do not want to collect data
		if (doc.getElementsByName('remotedestructionform')[0] !== undefined) { 
			var loc = doc.getElementsByName('tradesettings')[0].action;
			loc = loc.substring(loc.lastIndexOf("=")+1);
			postData += loc;
		} else {
			//var postData = "version=" + readCookie('currentVersion') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&loc=" + readCookie('userloc');
			postData += readCookie('userloc');
		}
		
		var name = doc.getElementsByTagName('b')[0].textContent;
		postData += "&name=" + name + "&bts=";
		
		if (hideIllegalBuildings && (name.match('Drug Station') || name.match('Slave Camp') || name.match('Dark Dome'))) { return; }
		if (hideMilitaryBuildings && (name.match('Military Outpost') || name.match('Alliance Command'))) { return; }

		for (var i = 5;i < tbl.getElementsByTagName('tr').length;i++) {
			var bts = tbl.getElementsByTagName('tr')[i].getElementsByTagName('td');
			if (bts.length == 7) {
				// Resource
				postData += "<wbr>~" + bts[1].textContent;
				// Amount
				postData += "," + bts[2].textContent;
				// Min
				postData += "," + bts[3].childNodes[0].defaultValue;
				// Max
				postData += "," + bts[4].childNodes[0].defaultValue;
				// Trader Buys
				postData += "," + bts[6].childNodes[0].defaultValue;
				// Trader Sells
				postData += "," + bts[5].childNodes[0].defaultValue;
			}
		}
						
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importownbuildinginfo.php", postData);
	} catch(ex) { debugAlert(ex); }
}
function overviewBuildings(doc,hideIllegalBuildings,hideMilitaryBuildings) {
	try {
		if (hideIllegalBuildings && (name.match('Drug Station') || name.match('Slave Camp') || name.match('Dark Dome'))) { return; }
		if (hideMilitaryBuildings && (name.match('Military Outpost') || name.match('Alliance Command'))) { return; }

		var postData = "version=" + readCookie('currentVersion');
		
		postData += "&owner=" + readCookie('user');
		if (readCookie('faction') !== null) { postData += "&faction=" + readCookie('faction'); }
		else if (readCookie('syndicate') !== null) { postData += "&faction=" + readCookie('syndicate'); }
		var tbl = doc.getElementById('mToggle').parentNode.parentNode.parentNode.parentNode;

		postData += "&bo=" + tbl.rows.length;
		
		for (var i = 1;i < tbl.rows.length;i++) {
			if (tbl.rows[i].cells.length < 8) { continue; }
			var td = tbl.rows[i].cells;
			
			// Get Building Name and Location
			var a = td[0].getElementsByTagName('a')[0];
			var loc = a.href;
			loc = loc.substr(loc.indexOf("=")+1);
			postData += "<wbr>&b" + i + "=" + loc;
			
			postData += "," + a.textContent;
			
			// Get Sector & X & Y
			var sector = td[1].textContent;
			var x = sector.substring(sector.indexOf(":")+2,sector.indexOf(","));
			var y = sector.substring(sector.indexOf(",")+1);
			sector = sector.substring(0,sector.indexOf(":"));
			postData += "," + sector + "," + x + "," + y;
					
			// Get Capacity and Free Space
			var cap = td[2].textContent;
			//var fs = cap.substring(cap.indexOf("(")+1,cap.length-1);
			cap = cap.substring(0,cap.indexOf("(")-1);
			
			// Get Condition
			postData += "," + td[3].textContent;
			
			// Get Level
			postData += "," + td[4].textContent;
			
			
			// Get Upkeep
			if (td[8].getElementsByTagName("table")[0] !== undefined) {
				var u = td[8].getElementsByTagName("table")[0].getElementsByTagName('td');
					
				postData += "<wbr>&u" + i + "=";
			
				var amount;
			
				for (var j = 0;j < u.length;j++) {
					postData += "~" + u[j].getElementsByTagName("img")[0].alt;
					amount = u[j].textContent;
					postData += "," + amount.substring(amount.indexOf(":")+2);
				}
			}
			
			// Get Commodities
			var p = td[9].getElementsByTagName("table")[0].getElementsByTagName('td');
			
			if (p[0].getElementsByTagName("img")[0] !== undefined) {
				postData += "<wbr>&p" + i + "=";
				for (var k = 0;k < p.length;k++) {
					postData += "~" + p[k].getElementsByTagName("img")[0].alt;
					amount = p[k].textContent;
					postData += "," + amount.substring(amount.indexOf(":")+2);
				}
			}
		}
		
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importbuildingoverview.php", postData);
	} catch(ex) { debugAlert(ex); }
}
function starbaseEquipment(doc,tab) {
	try {
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&tab=" + tab + "&eq=";

		var t = 3;
		var tbl = doc.getElementsByTagName('table');
		while (tbl[t].getAttribute('class') != "tabstyle") { t++; }
		tbl = tbl[t + 2];

		for (var i = 1;i < tbl.rows.length;i++) {
			var td = tbl.rows[i].cells;
			
			// Get the Image of the Equipment
			var img = td[0].getElementsByTagName("img")[0].src;
			postData += "<wbr>~" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			
			// Get Item Name
			postData += "," + td[0].getElementsByTagName("td")[1].textContent.replace(/^\s+|\s+$/g,"");
			
			// Get Sell Price
			//postData += "," + td[2].textContent.replace(",","");

			// Get Buy Price
			postData += "," + td[3].textContent.replace(",","").replace(",","").replace(",","");
			
			// Get Available
			postData += "," + td[6].textContent.replace(",","").replace(",","").replace(",","");
		}
		
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importequipmentinfo.php", postData);
	} catch (ex) { debugAlert(ex); }
}
function hireSquadrons(doc) {
	try {
		//var postData = "version=" + readCookie('currentVersion') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&loc=" + readCookie('userloc');
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&squads=";
		var tbl_list = doc.getElementsByTagName('table');
		for (var $i = 0; $i < tbl_list[2].getElementsByTagName('table').length;$i++) {
			var tbl = tbl_list[2].getElementsByTagName('table')[$i];
			var img = tbl.getElementsByTagName('img')[0].src;
			img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			var b = tbl.getElementsByTagName('b');
			var type= b[0].textContent;
			var weapons = b[1].textContent;
			var credit = b[2].textContent.replace(",","");
			postData += "<wbr>~" + img + "," + type + "," + weapons + "," + credit;
		}
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importstarbaseinfo.php", postData);
	} catch (ex) { debugAlert(ex); }
}
function indexBuildings(doc) {
	try {
		var sector = doc.getElementsByTagName('h1')[0].textContent;
		sector = sector.substring(0,sector.indexOf(" Building Index"));
		var date = doc.getElementsByClassName('cached')[0].childNodes[2].textContent;
		var tbl = doc.getElementsByTagName('tr');
		for (var i = 0; i < tbl.length; i++) {
			if (tbl[i].hasAttribute('onmouseout')) {
				var name = tbl[i].getElementsByTagName('td')[0].getElementsByTagName('img')[0].title;
				var img = tbl[i].getElementsByTagName('td')[0].getElementsByTagName('img')[0].src;
				img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
				var coords = tbl[i].getElementsByTagName('td')[1].textContent;
				var loc_x = coords.substring(1,coords.indexOf(','));
				var loc_y = coords.substring(coords.indexOf(',')+1,coords.indexOf(']'));
				var owner = tbl[i].getElementsByTagName('td')[2].textContent;
				var postData = "version=" + readCookie('currentVersion') + "&bi=1&sector=" + sector + "&x=" + loc_x + "&y=" + loc_y + "&img=" + img + "&name=" + name + "&owner=" + owner + "&date=" + date;
				if (tbl[i].getElementsByTagName('td')[3].getElementsByTagName('table').length !== 0) {
					var res_tbl = tbl[i].getElementsByTagName('td')[3].getElementsByTagName('table');
					var amount;
					var price;
					for (var l = 0;l < res_tbl.length;l++) {
						switch (res_tbl[l].rows[0].cells[0].textContent) {
							case "selling:" :
								postData += "<wbr>&bis=";
								var selling = res_tbl[l].getElementsByTagName('td');
								for (var j = 1; j < selling.length;j++) {
									if (j > 1) { postData += "<wbr>~"; }
									img = selling[j].childNodes[0].src;
									img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
									amount = selling[j].childNodes[1].textContent.substring(3);
									price = selling[j].childNodes[3].textContent.substring(1);
									postData +=img + "," + amount + "," + price;
								}
								break;
							case "buying:" :
								var buying = res_tbl[l].getElementsByTagName('td');
								postData += "<wbr>&bib=";
								for (var k = 1; k <buying.length;k++) {
									if (k > 1) { postData += "<wbr>~"; }
									img = buying[k].childNodes[0].src;
									img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
									amount = buying[k].childNodes[1].textContent.substring(3);
									price = buying[k].childNodes[3].textContent.substring(1);
									postData += img + "," + amount + "," + price;
								}
								break;
							case "free capacity:" :
								var fc = res_tbl[l].getElementsByTagName('td');
								postData += "&fs=" + fc[1].textContent.substring(0,fc[1].textContent.length - 1);
								break;
						}
					}
				}
				//alert(i + " -- " + postData);
				var httpRequest = new XMLHttpComm();
				httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
				httpRequest.Post(readCookie('server') + "importbuildingindex.php", postData);
			}
		}
	} catch (ex) { debugAlert(ex); }
}
function ship2OpponentCombat(doc) {
	try {
		//var postData = "version=" + readCookie('currentVersion') + "&x=" + readCookie('x') + "&y=" + readCookie('y') + "&loc=" + readCookie('userloc');
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
			
		var tbl =doc.getElementsByTagName('img');
		var ship;
		for (var i = 0;i < tbl.length;i++) { if (tbl[i].src.match('ships')) { ship = tbl[i].parentNode; } }
		var npc = ship.nextSibling;
				
		// Ship Data *** Not Collected
				
		//NPC Data
		postData += "<wbr>&name=" + npc.getElementsByTagName('b')[0].textContent;
				
		var img = npc.getElementsByTagName('img')[0].src;
		postData += "<wbr>&img=" + img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
				
		tbl = npc.getElementsByTagName('table');
					
		if (tbl.length == 2) {
			if (tbl[0].textContent.match("Hull points") !== false) {
				postData += "<wbr>&hull=" + tbl[0].getElementsByTagName('table')[0].getAttribute('width');
			}
		}
		var npc_stats;
		if (tbl.length > 2) {
			npc_stats = tbl[0].getElementsByTagName('tr')[0];
			if (npc_stats.textContent.match("Hull points")) {
				postData += "<wbr>&hull=" + npc_stats.getElementsByTagName('table')[0].getAttribute('width');
			}
			npc_stats = npc_stats.nextSibling;
			if (npc_stats.textContent.match("Armor points")) {
				postData += "<wbr>&armor=" + npc_stats.getElementsByTagName('table')[0].getAttribute('width');
			}
		}
		if (tbl.length > 3) {
			npc_stats = npc_stats.nextSibling;
			if (npc_stats.textContent.match("Shield points")) {
				postData += "<wbr>&shield=" + npc_stats.getElementsByTagName('table')[0].getAttribute('width');
			}
		}
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importnpcinfo.php", postData);
	}
	catch (ex) { debugAlert(ex); }
}
function bulletinBoard(doc) {
	var MISSION_TRANSPORT_PACKAGES = "Transport Packages";
	var MISSION_ASSASSINATION = "Assassination";
	var MISSION_TRANSPORT_EXPLOSIVES = "Transport Explosives";
	var MISSION_VIP_ACTION_TRIP = "VIP Action Trip";
	var MISSION_TRANSPORT_VIP = "Transport VIP";
	var MISSION_CLEANING_WORMHOLE = "Cleaning Wormhole Exit";
	var MISSION_WAR_EXPLOSIVES = "Transport Military Explosives";
	var MISSION_WAR_EXPLOSIVES_LT = "Transport Military Explosives LONG-TERM";
	var MISSION_WAR_SCOUT = "Scout";
	var MISSION_WAR_SCOUT_LT = "Scout LONG-TERM";
	var MISSION_WAR_ESPIONAGE = "Espionage";
	var MISSION_WAR_ESPIONAGE_LT = "Espionage LONG-TERM";
	var MISSION_TSS_SPYING = "Spying";
	var MISSION_TSS_SPYING_LT = "SpyingLONG-TERM";
	var MISSION_TSS_DECEPTION = "Deception";
	var MISSION_TSS_DECEPTION_LT = "DeceptionLONG-TERM";
	var MISSION_TSS_SMUGGLE = "Smuggle Body Parts";
	var MISSION_TSS_SMUGGLE_LT = "Smuggle Body PartsLONG-TERM";
	var MISSION_TSS_EXPLOSIVES = "Plant Explosives";
	var MISSION_TSS_EXPLOSIVES_LT = "Plant ExplosivesLONG-TERM";
	var MISSION_TSS_INFORMANT = "Transport Informant";
	var MISSION_TSS_INFORMANT_LT = "Transport InformantLONG-TERM";
			
	try {
		for (var i = 1; i < doc.getElementsByTagName('font').length;i++) {
			var mode = doc.getElementsByTagName('font')[i];
			if (mode.textContent.match(/Switch to compact mode|Switch to normal mode/)) { break; }
		}
		if (readCookie('comp') !== null || readCookie('rank') !== null) {
			var tbl = null;
			var text = null;
			var faction = null;
			var amount = null;
			var target = null;
			var sector = null;
			var x = null;
			var y = null;
			var time = null;
			var credits = null;
			var type = null;
			var type_img = null;
			var war_points = null;
			
			var cell = null;
			var id = null;
			var img = null;
			var i = 0;
			var temp;
		
			var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
			postData += "&comp=" + readCookie('comp') + "&rank=" + readCookie('rank');
			postData += "&faction=" + readCookie('faction') + "&syndicate=" + readCookie('syndicate');
			postData += "&mission=";

			if (mode.textContent.match('compact mode')) {
				tbl = doc.getElementsByTagName('table');
				for (i = 4; i < tbl.length; i++) {
					// Skip over anything that doesn't have tables inside of it.
					if (tbl[i].getElementsByTagName('table').length === 0) { continue; }

					// Lets get the Body of the Mission and set some default values
					text = tbl[i].rows[1].cells[2].getElementsByTagName('b');
				
					faction = null;
					amount = null;
					target = null;
					sector = null;
					x = null;
					y = null;
					time = null;
					credits = null;
					img = null;
					war_points = null;
						
					// Grab the first cell of the first row
					cell = tbl[i].rows[0].cells[0];
					
					// Get this id for this missions
					id = tbl[i].getElementsByTagName('div')[0].id.substring(1);
					//alert(id);
					
					//Check if we are looking for War Points
					if (cell.textContent.match("War")) {
						war_points = trim(cell.textContent);
						// Skip for now
						cell = tbl[i].rows[0].cells[1];
					}
					
					// Grab the 1st Image
					img = cell.getElementsByTagName('img')[0];
						
					// Check to see if this is a TSS or EPS or Faction Mission
					if (img) {
						// Check if this is a TSS or EPS mission
						img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1);
						// If We have a TSS or EPS Mission Jump to the Next Cell
						if (img.match("tss") || img.match("eps")) { cell = tbl[i].rows[0].cells[1]; }
						// This is who ordered the mission
						faction = img;
					}
							
					type = trim(cell.textContent);

					// Get Img for Missions
					img = tbl[i].rows[1].getElementsByTagName('img')[0];
					type_img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1);
					if (type_img.match('images/')) { type_img = type_img.substring(7); }
						
					// Find out if Mission Has Cargo or XP 
					var count = tbl[i].rows[2].cells.length;
					// There is something in the cargo/xp field But we don't want the location for a transport mission
					if ((count == 3) && (type != MISSION_TRANSPORT_VIP)) {
						if (type == MISSION_TSS_SPYING || type == MISSION_TSS_SPYING_LT || type == MISSION_WAR_ESPIONAGE || type == MISSION_WAR_ESPIONAGE_LT) {
							amount = tbl[i].rows[2].getElementsByTagName('img')[0].src;
							amount = amount.substring(amount.lastIndexOf('/',amount.lastIndexOf('/')-1)+1);
						} else {
							amount = tbl[i].rows[2].cells[0].textContent;
							// Check to see if We are grabbing XP
							if (type == MISSION_VIP_ACTION_TRIP) {
								amount = amount.split(" ")[1];
							}
						}
						//alert("-" + amount + "-");
					} 
					switch (type) {
						case MISSION_TRANSPORT_VIP :
						case MISSION_TSS_DECEPTION :
						case MISSION_TSS_DECEPTION_LT :
						case MISSION_TSS_SPYING :
						case MISSION_TSS_SPYING_LT :
						case MISSION_WAR_SCOUT :
						case MISSION_WAR_SCOUT_LT :
						case MISSION_TSS_INFORMANT :
						case MISSION_TSS_INFORMANT_LT :
						case MISSION_WAR_ESPIONAGE :
						case MISSION_WAR_ESPIONAGE_LT :
							target = text[0].textContent;
							sector = text[1].textContent;
							x = text[2].textContent.split(',')[0];
							y = text[2].textContent.split(',')[1];
							time = text[3].textContent;
							credits = text[4].textContent;
							break;
							
						case MISSION_TSS_SMUGGLE :
						case MISSION_TSS_SMUGGLE_LT :
							target = text[1].textContent;
							sector = text[2].textContent;
							x = text[3].textContent.split(',')[0];
							y = text[3].textContent.split(',')[1];
							time = text[5].textContent;
							credits = text[4].textContent;
							break;
							
						case MISSION_TRANSPORT_PACKAGES :
						case MISSION_TRANSPORT_EXPLOSIVES :
						case MISSION_TSS_EXPLOSIVES :
						case MISSION_TSS_EXPLOSIVES_LT :
						case MISSION_VIP_ACTION_TRIP :
						case MISSION_WAR_EXPLOSIVES :
						case MISSION_WAR_EXPLOSIVES_LT :
							target = text[1].textContent;
							sector = text[2].textContent;
							x = text[3].textContent.split(',')[0];
							y = text[3].textContent.split(',')[1];
							time = text[4].textContent;
							credits = text[5].textContent;
							break;
						
						case MISSION_ASSASSINATION :
							time = text[2].textContent;
							credits = text[1].textContent;
							
							if (!amount) {
								sector = text[1].textContent;
								x = text[2].textContent.split(',')[0];
								y = text[2].textContent.split(',')[1];
								time = text[3].textContent;
								credits = text[4].textContent;
							}
							break;
							
						case MISSION_CLEANING_WORMHOLE :
							sector = text[0].textContent;
							x = text[1].textContent.split(',')[0];
							y = text[1].textContent.split(',')[1];
							credits = text[2].textContent;
							time = text[3].textContent;
							break;
					}
					
					// Time to Parse the body of the message
					
					if (time.split(" ").length > 1) {
						temp = time.split(" ");
						time = parseInt(temp[0].replace("d",""),10) * 3600 + parseInt(temp[1].replace("h",""),10) * 60 + parseInt(temp[2].replace("m",""),10);
					}
					
					postData += "<wbr>~" + id + ",";
					postData += (faction === null || faction  === undefined) ? "," : faction + ","; 
					postData += (type === null || type  === undefined)  ? "," : type + ","; 
					postData += (type_img === null || type_img  === undefined) ? "," : type_img + ","; 
					postData += (amount === null || amount  === undefined) ? "," : amount + ","; 
					postData += (target === null || target  === undefined) ? "," : target + ","; 
					postData += (sector === null || sector  === undefined) ? "," : sector + ","; 
					postData += (x === null || x  === undefined) ? "," : x + ","; 
					postData += (y === null || y  === undefined) ? "," : y + ","; 
					postData += (time === null || time  === undefined) ? "," : time + ","; 
					postData += (credits === null || credits  === undefined) ? "," : credits.replace(',','').replace(',','').replace(',','').replace(' ','').replace(' ','') + ","; 
					postData += (war_points === null || war_points === undefined) ? "," : war_points.replace(',','');
					//alert (id + "-" + faction + "-" + type + "-" + type_img + "-" + amount + "-" + target + "-" + sector + "-" + coords + "-" + time + "-" + credits);
				}
			} else {
				tbl = doc.getElementById('missions').childNodes[0];
				for (i = 1; i < tbl.rows.length; i++) {
					var r = tbl.rows[i];
					
					faction = null;
					amount = null;
					target = null;
					sector = null;
					x = null;
					y = null;
					time = null;
					credits = null;
					img = null;
					
					id = r.getElementsByTagName('div')[0].id.substring(1);
					
					var j = 0;
					
					// Get Faction Information
					img = r.cells[j++].getElementsByTagName('img')[0];
					if (img) { faction = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1); }

					if (r.cells.length == 11) {
						// Member of a Syndicate is This a TSS or EPS Mission ?
						img = r.cells[j++].getElementsByTagName('img')[0];
							
						// This is a TSS or EPS Mission					
						if (img) { faction = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1); }
						
						// Get Type of Mission
						img = r.cells[j++].getElementsByTagName('img')[0];
						if (img) {
							type_img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1); 
							type = img.alt;
						}
					} else { 
						// Not a member of a syndicate
						// Get Type of Mission
						img = r.cells[j++].getElementsByTagName('img')[0];
						if (img) {
							type_img = img.src.substring(img.src.lastIndexOf('/',img.src.lastIndexOf('/')-1)+1); 
							type = img.alt;
						}
					}
					if (type_img.match('images/')) { type_img = type_img.substring(7); }
					// Get Amount Information
					temp = r.cells[j++].getElementsByTagName('b')[0];
					if (temp) {
						if (temp.getElementsByTagName('font')[0]) { temp = temp.getElementsByTagName('font')[0]; }
						amount = temp.innerHTML;
					}
					// Get Time
					time = r.cells[j++].innerHTML;
					// Get Target
					temp = r.cells[j++].innerHTML;
					if (temp.length > 1) { target = temp; }
					// Get Sector
					temp = r.cells[j++].innerHTML;
					if (temp.length > 1) { sector = temp; }
					// Get Coords
					temp = r.cells[j++].innerHTML;
					if (temp.length > 1) {
						x = temp.substring(1,temp.indexOf(','));
						y = temp.substring(temp.indexOf(',') + 1,temp.indexOf(']'));
					}
					// Get Credits
					credits = r.cells[j++].textContent;
					credits = credits.substring(1,credits.length - 1);
					
					postData += "<wbr>~" + id + ",";
					postData += (!faction) ? "," : faction + ","; 
					postData += (!type)  ? "," : type + ","; 
					postData += (!type_img) ? "," : type_img + ","; 
					postData += (!amount) ? "," : amount + ","; 
					postData += (!target) ? "," : target + ","; 
					postData += (!sector) ? "," : sector + ","; 
					postData += (!x) ? "," : x + ","; 
					postData += (!y) ? "," : y + ","; 
					postData += (!time) ? "," : time + ","; 
					postData += (!credits) ? "," : credits.replace(',','').replace(',','').replace(',',''); 
				}			
			}
			//alert(postData);
			var httpRequest = new XMLHttpComm();
			httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
			httpRequest.Post(readCookie('server') + "importmissioninfo.php", postData);
		} else {
			var tipDiv = mode.parentNode;
			var newTable = doc.createElement('table');
			newTable.border = 1;
			var newTr = doc.createElement('tr');
			var newTd = doc.createElement('td');
			newTd.style.backgroundColor = "red";
			newTd.style.color = "black";
			newTd.innerHTML = "<strong><a href='http://" + readCookie('uni') + ".pardus.at/overview_stats.php'>From Zaqwer's Pardus Mapper -- Please Visit the Overview Stats Page Before Visiting Builetin Boards to Log Mission Data</a></strong>";
			newTr.appendChild(newTd);
			newTable.appendChild(newTr);
			tipDiv.parentNode.insertBefore(newTable,tipDiv);
			tipDiv.parentNode.insertBefore(doc.createElement('br'),tipDiv);
			return;
		}
	} catch (ex) { debugAlert(ex); }
}

function bulletinBoardAccept(doc) {
	try {
		var search = doc.location.search;
		search = search.substring(search.indexOf('=') + 1);

		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&mid=" + search;
		
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importmissioninfo.php", postData);
	} catch (ex) { debugAlert(ex); }
}

function crewInformation(doc) {
	try {
		var postData = "uni=" + readCookie('uni') + "&version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc') + "&crew=";
		
		var t = 2;
		var tbl = doc.getElementsByTagName('table');
		while (!(tbl[t].getAttribute('class') && tbl[t].getAttribute('class').match(/tabstyle/))) { t++; }

		var crew = tbl[t].rows[1].cells[1].getElementsByTagName('table');
		
		for (var i = 0; i < crew.length; i += 3) {
			//Crew Variables
			var name = null;
			var title = null;
			var job1 = null;
			var job2 = null;
			var lvl = null;
			var rate = 1;
			var pay_table = 0;
			var fee = null;
			var pay = null;
			
			var crew_row = crew[i].rows[1];
			var type = trim(crew[i].getElementsByTagName('table')[0].rows[0].cells[1].textContent);
			
			var img = crew_row.getElementsByTagName('img')[0].src;
			img = img.substring(img.lastIndexOf('/',img.lastIndexOf('/')-1)+1);
			
			var temp = crew_row.cells[1].textContent;
			
			if (type.match(/Legendary Crew Member/)) {
				name = crew_row.cells[1].getElementsByTagName('span')[0].textContent;
				title = crew_row.getElementsByTagName('b')[0].textContent.replace(name,"");
				job1 = trim(crew_row.getElementsByTagName('table')[0].rows[0].cells[1].textContent);
				job2 = trim(crew_row.getElementsByTagName('table')[0].rows[1].cells[1].textContent);
				
				if (crew_row.getElementsByTagName('table')[1].getElementsByTagName('a').length !== 0) { rate = 1.2; }
				pay_table = 1;
				i += 1;
			} else {
				name = crew_row.getElementsByTagName('b')[0].textContent;
				
				lvl = temp.substring(temp.indexOf('Lvl')+4,temp.indexOf('Lvl')+5);
				job1 = temp.substring(temp.indexOf('Lvl')+6,temp.indexOf('Sign-up'));
				
				if (crew_row.getElementsByTagName('a').length !== 0) { rate = 1.2; }
			}
				
			fee = rate * trim(crew_row.getElementsByTagName('table')[pay_table].rows[0].cells[1].textContent).replace(',','').replace(',','').replace(',','');
			pay = rate * trim(crew_row.getElementsByTagName('table')[pay_table].rows[1].cells[1].textContent).replace(',','').replace(',','').replace(',','').replace(' / day','');
			
			postData += "<wbr>~" + name + "," + img + "," + type + ","; 
			postData += ( title === null || title  === undefined) ? "," : title + ","; 
			postData += ( job1 === null || job1 === undefined) ? "," : job1 + ","; 
			postData += ( job2 === null || job2 === undefined) ? "," : job2 + ","; 
			postData += ( lvl === null || lvl === undefined) ? "," : lvl + ","; 
			postData += fee + ","; 
			postData += pay;
		}
		
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importcrewinfo.php", postData);
	} catch (ex) { debugAlert(ex); }

}
function shipyardInformation(doc) {
	try {
		var postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
		postData += "&tab=ship" + "&eq=";
		var t = 3;
		var tbl = doc.getElementsByTagName('table');
		while (tbl[t].getAttribute('class') != "tabstyle") { t++; }
		
		var ships = tbl[t].rows[1].cells[0].getElementsByTagName('table')[0].rows[1].cells[0];
		
		var count = ships.getElementsByTagName('a').length;

		var name;
		
		for (var i = 0; i < count; i++) {
			name = ships.getElementsByTagName('a')[i].textContent;
			var amount = ships.getElementsByTagName('font')[i].textContent;
			amount = amount.substring(1,amount.indexOf(']'));
			
			postData += "<wbr>~" + name + ",";
			postData += amount;
		}
		
		//alert(postData);
		var httpRequest = new XMLHttpComm();
		httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
		httpRequest.Post(readCookie('server') + "importequipmentinfo.php", postData);

		if (!tbl[t].rows[1].cells[1].textContent.match("No ship selected!")) {
			postData = "version=" + readCookie('currentVersion') + "&loc=" + readCookie('userloc');
			postData += "&tab=ship" + "&sp=" ;
		
		
			var temp = tbl[t].rows[1].cells[2].getElementsByTagName('b');
		
			name = temp[0].textContent;
			var price = temp[2].textContent;
			price = price.substring(7,price.indexOf('Credits')-1).replace(',','').replace(',','').replace(',','');

			postData += "<wbr>~" + name + "," + price;
			
			//alert(postData);
			httpRequest = new XMLHttpComm();
			httpRequest.CallBack = httpRequest.RetrieveCommsResponse;
			httpRequest.Post(readCookie('server') + "importequipmentinfo.php", postData);
		}
	} catch (ex) { debugAlert(ex); }

}

function pardusMapper() {
	// Load Document data into short variables
	var doc = document;
	var loc = doc.location.href;
	var search = doc.location.search.substring(doc.location.search.indexOf("=")+1);

	if (readCookie('currentVersion') === null || readCookie('currentVersion') !== 6.6) {
		// Set Cookie Variables for this session.
		createCookie('currentVersion',6.6);
		if (testing) { createCookie('server',"http://pardusmap.mhwva.net/TestMap/include/"); }
		else { createCookie('server',"http://pardusmap.mhwva.net/include/"); }
	
		if (readCookie('activate') === null) { createCookie('activate',autostart); }
		if (readCookie('show_over') === null) { createCookie('show_over','false'); }

	}
	if (loc.match('pardusmap.mhwva.net')) {
		if (loc.match(/include/)) { return; }
		var uni = "";
		var webVersion = 0;
		var header = "";
		var tr = "";
		var td = "";
		if (loc.match('Orion')) { uni = 'Orion'; }
		if (loc.match('Artemis')) { uni = 'Artemis'; }
		if (loc.match('Pegasus')) { uni = 'Pegasus'; }
		if (loc.match('TestMap')) {
			// We are Visiting the Map lets see if you are using the most recent version of the user script
			webVersion = doc.getElementById('footer').getElementsByTagName('div')[0].getAttribute('id');
			if (readCookie('currentVersion') < parseFloat(webVersion)) {
				header = doc.getElementById('header_side').getElementsByTagName('tbody')[0];
				//alert(header.innerHTML);
				tr = doc.createElement('tr');
				td = doc.createElement('td');
				td.style.backgroundColor = "red";
				td.innerHTML = "<a href=\"http://pardusmap.mhwva.net/TestMap/" + uni + "/download/?dl=1\"><strong>Download<br>Script v" + webVersion + "</strong></a>";
				tr.appendChild(td);
				header.appendChild(tr);
			}
		} else {
			// We are Visiting the Map lets see if you are using the most recent version of the user script
			webVersion = doc.getElementById('footer').getElementsByTagName('div')[0].getAttribute('id');
			if (readCookie('currentVersion') < parseFloat(webVersion)) {
				header = doc.getElementById('header_side').getElementsByTagName('tbody')[0];
				//alert(header.innerHTML);
				tr = doc.createElement('tr');
				td = doc.createElement('td');
				td.style.backgroundColor = "red";
				td.innerHTML = "<a href=\"http://pardusmap.mhwva.net/" + uni + "/download/?dl=1\"><strong>Download<br>Script v" + webVersion + "</strong></a>";
				tr.appendChild(td);
				header.appendChild(tr);
			}		
		}
	}

	if (loc.match('msgframe.php')) {
		if (readCookie('activate') === 'true') {
			doc.getElementById("universe").parentNode.innerHTML += ' | <a href="javascript:activate(\'activate\');"><img border="0" id="zaqwer_mapper_activate" src="http://pardusmap.mhwva.net/images/green.png" title="Zaqwer\'s Pardus Mapper Active"/></a>';
		} else {
			doc.getElementById("universe").parentNode.innerHTML += ' | <a href="javascript:activate(\'activate\');"><img border="0" id="zaqwer_mapper_activate" src="http://pardusmap.mhwva.net/images/red.png" title="Zaqwer\'s Pardus Mapper Inactive"/></a>';
		}
		if (!window.opera) {
			if (readCookie('show_over') === 'true') {
				doc.getElementById("universe").parentNode.innerHTML += ' | <a href="javascript:activate(\'show_over\');"><img border="0" id="zaqwer_mapper_show_over" src="http://pardusmap.mhwva.net/images/green.png" title="Zaqwer\'s Building Overview On"/></a>';
			} else {
				doc.getElementById("universe").parentNode.innerHTML += ' | <a href="javascript:activate(\'show_over\');"><img border="0" id="zaqwer_mapper_show_over" src="http://pardusmap.mhwva.net/images/red.png" title="Zaqwer\'s Building Overview Off"/></a>';
			}
		}
		
		var s = document.createElement('script');
		s.type = "text/javascript";
		var stext = "function activate (name) {\n"
			+ "	var z = document.getElementById('zaqwer_mapper_' + name);\n"
			+ "	if (z.src.match('green')) {\n"
			+ "		document.cookie= name + '=false; path=/';\n"
			+ "		z.src = 'http://pardusmap.mhwva.net/images/red.png';\n"
			+ "	} else {\n"
			+ "		document.cookie= name + '=true; path=/';\n"
			+ "		z.src = 'http://pardusmap.mhwva.net/images/green.png';\n"
			+ "	}\n"
			+ "	document.location.href = document.location.href;\n"
			+ "}\n";
		s.appendChild(document.createTextNode(stext));
		document.getElementsByTagName("head")[0].appendChild(s);
	}

	if (readCookie('activate') !== 'true') { return; }
	
	if (enableArtemis && loc.match('artemis.pardus.at')) {
		createCookie('uni',"Artemis");
		getUserLoc(doc);
		if (loc.match('msgframe.php')) { messageFrame(doc); return;}		
		if (loc.match('overview_stats.php')) { overviewStats(doc);  return;}
		if (loc.match('main.php')) { mainMap(doc,enableSectorLink,enableCoordsLink);  return;}
		if (loc.match('ship_equipment.php') && (search != "repair" && search.length > 0)) { starbaseEquipment(doc,search);  return;}
		if (loc.match('crew_quarters.php')) { crewInformation(doc);  return;}
		if (loc.match('shipyard.php')) { shipyardInformation(doc);  return;}
		if (enableArtemisBuildingInformation) {
			if (loc.match('newbuilding.php')) { return; }
			if (loc.match('building.php')) { buildingInformation(doc,hideArtemisIllegalBuildings,hideArtemisMilitaryBuildings);  return;}
			if (loc.match('planet.php')) { planetInformation(doc);  return;}
			if (loc.match('starbase.php')) { starbaseInformation(doc);  return;}
			if (loc.match('building_trade.php')) { buildingTrade(doc,hideArtemisIllegalBuildings,hideArtemisMilitaryBuildings);  return;}
			if (loc.match('planet_trade.php')) { planetTrade(doc);  return;}
			if (loc.match('starbase_trade.php')) { starbaseTrade(doc);  return;}
			if (loc.match('building_management.php')) { buildingManagement(doc,hideArtemisIllegalBuildings,hideArtemisMilitaryBuildings);  return;}
			if (loc.match('building_trade_settings.php')) { buildingTradeSettings(doc,hideArtemisIllegalBuildings,hideArtemisMilitaryBuildings);  return;}
			if (loc.match('overview_buildings.php')) { overviewBuildings(doc,hideArtemisIllegalBuildings,hideArtemisMilitaryBuildings);  return;}
		}
		if (enableArtemisSquadronInformation && loc.match('hire_squadrons.php')) { hireSquadrons(doc);  return;}
		if (enableArtemisBuildingIndex && loc.match('index_buildings.php')) { indexBuildings(doc);  return;}
		if (enableArtemisNPCInformation && loc.match('ship2opponent_combat.php')) { ship2OpponentCombat(doc);  return;}
		if (enableArtemisMissionInformation) {
			if (loc.match('bulletin_board.php')) { bulletinBoard(doc);  return;}
			if (loc.match('bulletin_board_accept.php')) {bulletinBoardAccept(doc);  return;}
		}
		 return;
	} 
	if (enableOrion && loc.match('orion.pardus.at')) {
		createCookie('uni',"Orion");
		getUserLoc(doc);
		if (loc.match('msgframe.php')) { messageFrame(doc);  return;}		
		if (loc.match('overview_stats.php')) { overviewStats(doc);  return;}
		if (loc.match('main.php')) { mainMap(doc,enableSectorLink,enableCoordsLink);  return;}
		if (loc.match('ship_equipment.php') && (search != "repair" && search.length > 0)) { starbaseEquipment(doc,search);  return;}
		if (loc.match('crew_quarters.php')) { crewInformation(doc);  return;}
		if (loc.match('shipyard.php')) { shipyardInformation(doc);  return;}
		if (enableOrionBuildingInformation) {
			if (loc.match('newbuilding.php')) { return; }
			if (loc.match('building.php')) { buildingInformation(doc,hideOrionIllegalBuildings,hideOrionMilitaryBuildings);  return;}
			if (loc.match('planet.php')) { planetInformation(doc);  return;}
			if (loc.match('starbase.php')) { starbaseInformation(doc);  return;}
			if (loc.match('building_trade.php')) { buildingTrade(doc,hideOrionIllegalBuildings,hideOrionMilitaryBuildings);  return;}
			if (loc.match('planet_trade.php')) { planetTrade(doc);  return;}
			if (loc.match('starbase_trade.php')) { starbaseTrade(doc);  return;}
			if (loc.match('building_management.php')) { buildingManagement(doc,hideOrionIllegalBuildings,hideOrionMilitaryBuildings);  return;}
			if (loc.match('building_trade_settings.php')) { buildingTradeSettings(doc,hideOrionIllegalBuildings,hideOrionMilitaryBuildings);  return;}
			if (loc.match('overview_buildings.php')) { overviewBuildings(doc,hideOrionIllegalBuildings,hideOrionMilitaryBuildings);  return;}
		}
		if (enableOrionSquadronInformation && loc.match('hire_squadrons.php')) { hireSquadrons(doc);  return;}
		if (enableOrionBuildingIndex && loc.match('index_buildings.php')) { indexBuildings(doc);  return;}		
		if (enableOrionNPCInformation && loc.match('ship2opponent_combat.php')) { ship2OpponentCombat(doc);  return;}
		if (enableOrionMissionInformation) {
			if (loc.match('bulletin_board.php')) { bulletinBoard(doc);  return;}
			if (loc.match('bulletin_board_accept.php')) {bulletinBoardAccept(doc);  return;}
		}
		 return;
	}
	if (enablePegasus && loc.match('pegasus.pardus.at')) {
		createCookie('uni',"Pegasus");
		getUserLoc(doc);
		if (loc.match('msgframe.php')) { messageFrame(doc);  return;}		
		if (loc.match('overview_stats.php')) { overviewStats(doc);  return;}
		if (loc.match('main.php')) { mainMap(doc,enableSectorLink,enableCoordsLink);  return;}
		if (loc.match('ship_equipment.php') && (search != "repair" && search.length > 0)) { starbaseEquipment(doc,search);  return;}
		if (loc.match('crew_quarters.php')) { crewInformation(doc);  return;}
		if (loc.match('shipyard.php')) { shipyardInformation(doc);  return;}
		if (enablePegasusBuildingInformation) {
			if (loc.match('newbuilding.php')) { return; }
			if (loc.match('building.php')) { buildingInformation(doc,hidePegasusIllegalBuildings,hidePegasusMilitaryBuildings);  return;}
			if (loc.match('planet.php')) { planetInformation(doc);  return;}
			if (loc.match('starbase.php')) { starbaseInformation(doc);  return;}
			if (loc.match('building_trade.php')) { buildingTrade(doc,hidePegasusIllegalBuildings,hidePegasusMilitaryBuildings);  return;}
			if (loc.match('planet_trade.php')) { planetTrade(doc);  return;}
			if (loc.match('starbase_trade.php')) { starbaseTrade(doc);  return;}
			if (loc.match('building_management.php')) { buildingManagement(doc,hidePegasusIllegalBuildings,hidePegasusMilitaryBuildings);  return;}
			if (loc.match('building_trade_settings.php')) { buildingTradeSettings(doc,hidePegasusIllegalBuildings,hidePegasusMilitaryBuildings);  return;}
			if (loc.match('overview_buildings.php')) { overviewBuildings(doc,hidePegasusIllegalBuildings,hidePegasusMilitaryBuildings);  return;}
		}
		if (enablePegasusSquadronInformation && loc.match('hire_squadrons.php')) { hireSquadrons(doc);  return;}
		if (enablePegasusBuildingIndex && loc.match('index_buildings.php')) { indexBuildings(doc);  return;}
		if (enablePegasusNPCInformation && loc.match('ship2opponent_combat.php')) { ship2OpponentCombat(doc);  return;}
		if (enablePegasusMissionInformation) {
			if (loc.match('bulletin_board.php')) { bulletinBoard(doc);  return;}
			if (loc.match('bulletin_board_accept.php')) {bulletinBoardAccept(doc);  return;}
		}
		 return;
	}
	 return;
}

pardusMapper();

