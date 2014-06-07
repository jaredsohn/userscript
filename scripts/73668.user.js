// ==UserScript==
// @name           SOC Check For Gifts
// @namespace      http://www.sendasmile.net
// @description    When viewing message histories this script provides an option to see what gifts were sent with the cards.

// @include        https://www.sendoutcards.com/cgi-bin/trnuser.pl?view_contact:*
// @include        https://www.sendoutcards.com/production/*

// @author        Blaine Moore #74039
// @homepage      http://www.SendASmile.net/ 
// @version       2.0

// ==/UserScript==

//Generic lookup fuction for scraping a site
function xpath(query) {
 return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
} // function xpath(query) 

var isContactManager = !(/product/.test(window.location.href));
var AutoSave = (1 == unsafeWindow.localStorage.getItem("SOC_Check_For_Gifts_AutoSave"));
if(AutoSave) {
	if(isContactManager) { // Contact Manager
		var wDiv = xpath("//div[contains(., 'Welcome,')]").snapshotItem(0);
		var nDiv = document.createElement("div");
		nDiv.setAttribute("align","center");

		var aLink = document.createElement("a");
		aLink.href = "#";
		aLink.innerHTML = "Turn Off Automatic Gift Check";
		aLink.addEventListener("click", TurnOffAutoSave, true);
		nDiv.appendChild(aLink);	
		
		wDiv.parentNode.appendChild(nDiv);
	} else { // Date Search
		var helpLink = xpath("//a[@id='showHideHelp']").snapshotItem(0);
		var aLink = document.createElement("a");
		aLink.href = "#";
		aLink.setAttribute("class","bottom_nav_link");
		aLink.innerHTML = "Turn Off Automatic Gift Check";
		aLink.addEventListener("click", TurnOffAutoSave, true);
		helpLink.parentNode.insertBefore(aLink, helpLink.nextSibling);	
	} // if(isContactManager)
	GM_registerMenuCommand( "Turn Off Automatic Scraping For Gifts", TurnOffAutoSave);
	ScrapeGifts();
} else {
	if(isContactManager) { // Contact Manager
		var wDiv = xpath("//div[contains(., 'Welcome,')]").snapshotItem(0);
		var nDiv = document.createElement("div");
		nDiv.setAttribute("align","center");
		
		var gLink = document.createElement("a");
		gLink.href = "#";
		gLink.innerHTML = "Check For Gifts";
		gLink.addEventListener("click", ScrapeGifts, true);
		nDiv.appendChild(gLink);	
		
		var bar = document.createElement("span");
		bar.innerHTML = " | ";
		nDiv.appendChild(bar);
		
		var aLink = document.createElement("a");
		aLink.href = "#";
		aLink.innerHTML = "Always Check Automatically";
		aLink.addEventListener("click", TurnOnAutoSave, true);
		nDiv.appendChild(aLink);
		
		wDiv.parentNode.appendChild(nDiv);
	} else { // Date Search
		var helpLink = xpath("//a[@id='showHideHelp']").snapshotItem(0);
		var gLink = document.createElement("a");
		gLink.href = "#";
		gLink.setAttribute("class","bottom_nav_link");
		gLink.innerHTML = "Check For Gifts";
		gLink.addEventListener("click", ScrapeGifts, true);
		helpLink.parentNode.insertBefore(gLink, helpLink.nextSibling);	
		var aLink = document.createElement("a");
		aLink.href = "#";
		aLink.setAttribute("class","bottom_nav_link");
		aLink.innerHTML = "Always Check Automatically";
		aLink.addEventListener("click", TurnOnAutoSave, true);
		helpLink.parentNode.insertBefore(aLink, helpLink.nextSibling);	
	} // if(isContactManager)
	GM_registerMenuCommand( "Check Sent Cards For Gifts", ScrapeGifts );
	GM_registerMenuCommand( "Turn On Automatic Scraping For Gifts", TurnOnAutoSave);	
} // if(AutoSave) 

function ScrapeGifts() {
	var vlinks = xpath("//a[contains(@href,'/cardeditor/')]");
	for (var i=0 ; i<vlinks.snapshotLength; i++) {
		var node = vlinks.snapshotItem(i);
		GM_xmlhttpRequest({
			method: 'GET',
			url: node.href,
			onload: function(responseDetails) {
				AddGiftText(responseDetails, vlinks);	
			}
		});
	} // for (var i=0 ; i<vlinks.snapshotLength; i++)
} // function ScrapeGifts()

function AddGiftText(response, nodes) {
	var rGift = new RegExp("(.+)<.strong> as your Gift.<.li>");
	var cardID = /Card ID: (.+)<.p>/.exec(response.responseText)[1];
	GM_log('CardID ' + cardID + ': ' + nodes.snapshotLength + ' : ' + response.finalUrl);
	//GM_log('  Status: ' + det.status);
	//GM_log('  StatusText: ' + det.statusText);
	//GM_log('  Headers: ' + det.finalUrl);
	
	if(rGift.test(response.responseText)) {
		GM_log("    Passes rGift");
		for (var i=0 ; i<nodes.snapshotLength; i++) {
			var node = nodes.snapshotItem(i);
			var rHref = new RegExp(node.href);
			if(rHref.test(response.finalUrl)) {
				GM_log("     Anchors Match: " + node.href);
				var div = document.createElement((isContactManager)?"span":"div");
				div.innerHTML = ((isContactManager)?" &nbsp; ":"") + rGift.exec(response.responseText)[1];
				node.parentNode.insertBefore(div, node.nextSibling);
				//node.innerHTML =  rGift.exec(response.responseText)[1];
			} else { 
				GM_log("     Anchors Don't Match: \n           " + node.href + " \n           " + response.finalUrl);	
			}// if(rCardID.test(node.href)) 
		} // for (var i=0 ; i<vlinks.snapshotLength; i++)
	} // if(rGift.test(response))
} // function AddGiftText(node, response) 

function TurnOnAutoSave() {
	unsafeWindow.localStorage.setItem("SOC_Check_For_Gifts_AutoSave", '1');
	alert("You will now automatically check cards for gifts.");
	ScrapeGifts();
} // function TurnOnAutoSave()

function TurnOffAutoSave() {
	unsafeWindow.localStorage.removeItem("SOC_Check_For_Gifts_AutoSave");
	alert("You will no longer automatically check cards for gifts.");
} // function TurnOffAutoSave()