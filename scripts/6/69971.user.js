// ==UserScript==
// @name			GT_Updater
// @author			Pimp Trizkit
// @version			1.2
// @namespace		PimpNation
// @description		Updates gettertools website with info from marketplace, for WW.
// @include			http://*.travian*.*/*.php*
// @include		http://www.gettertools.com/*.travian.*
// @exclude		http://analytics.travian*.*/*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==

var gtURL = GM_getValue("GTURL", "");

function onGetterLoad () {
	var tmp = document.getElementById("text0");
	tmp.innerHTML = GM_getValue("RESPONSE", "");
	GM_setValue("RESPONSE", "");
	tmp = document.getElementsByClassName("button")[0];
	tmp.click();
}

if ( location.href.indexOf("gettertools") != -1 ) {
	if ( location.href.indexOf(gtURL) != -1 ) {
		if ( GM_getValue("RESPONSE", "") != "" ) window.addEventListener('load', onGetterLoad, false);
	}
} else {
	var iSiteId = document.getElementsByName("id");
	var temp = document.getElementsByClassName("mer");
	var tOK = document.getElementById("btn_ok");
	var t4Marketplace = document.getElementsByClassName("gid17");
	var WWnewdid = GM_getValue("WWNEWDID", 0);      //The village ID (newdid) of the WW village. This will be set when you set the interval. Make sure the active village is the WW when you set the interval.
	var iInterval = GM_getValue("GTINTERVAL", -1);   //number of minutes between updates.  0 = off. Set via dialog. Default is off, must set to turn on.
	var oIntervalReference = 0;
	var newWin = null;
	
	function getActiveVillage() {
		var oActiveLink = xpath("id('vlist')/table/tbody/tr[@class='sel']//a | //table[@id='vlist']/tbody/tr[td/@class='dot hl']//a | //a[@class='active']");
		if(oActiveLink.snapshotLength > 0) {
			var sHref = oActiveLink.snapshotItem(0).href;
			var aMatch = sHref.match(/newdid=([0-9]*)/i);
			if(!aMatch) return -1;
			else return aMatch[1];
		} else return -1;
	}

	function setUpGTU() {
		WWnewdid = getActiveVillage();
		if (WWnewdid != -1) {
			GM_setValue("WWNEWDID", WWnewdid);
			while ( isNaN(iInterval) || iInterval < 0 )	{
				iInterval = prompt("The WW newdid (village ID) is: " + WWnewdid + ".\nPlease enter the number of minutes to wait between GT updates. Must be a number; zero or higher. Zero is off.");
				if (iInterval == null) iInterval = 0;
				else iInterval = parseInt(iInterval);
			}	
			iInterval = iInterval*60000;
			if ( iInterval < 60000 ) {
				alert("GT Updater is OFF");
				turnOff();
				GM_setValue("GTINTERVAL", -1);
			} else {
				GM_log("Turning on GT Updater. Currently updating every " + (iInterval/60000) + " minute(s).");
				GM_setValue("GTINTERVAL", iInterval);
				clearInterval ( oIntervalReference );
				oIntervalReference = window.setInterval(doUpdate, iInterval);
				window.addEventListener('unload', turnOff, false);
				gtURL = prompt("Make sure FireFox automatically keeps you logged in to GetterTools.\nPlease paste the URL of your crop tool page at the GT website here:");
				if ( gtURL == null ) {
					alert("GT Updater is OFF");
					turnOff();
					GM_setValue("GTINTERVAL", -1);
					return;
				}
				while ( gtURL.indexOf("http://www.gettertools.com/") == -1 || gtURL.indexOf("travian") == -1 ) {
					gtURL = prompt("Invalid link!\nMake sure FireFox automatically keeps you logged in to GetterTools.\nPlease paste the URL of your crop tool page at the GT website here:");
					if ( gtURL == null ) {
						alert("GT Updater is OFF");
						turnOff();
						GM_setValue("GTINTERVAL", -1);
						return;
					}
				}
				GM_setValue("GTURL", gtURL);
			}
		} else alert("Unable to determine the active village id (newdid). GT updater not running.");
	}

	function xpath(query) { 
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function turnOff(){
		GM_log("Disabling GT Updater.")
		clearInterval ( oIntervalReference );
		oIntervalReference = 0;
		iInterval = -1;
	}

	function doUpdate() {
		var tNewdid = GM_getValue("WWNEWDID", 0);
		var tInterval = GM_getValue("GTINTERVAL", -1);
		var tGTURL = GM_getValue("GTURL","");
		if ( tNewdid < 1 || tInterval < 60000 || tGTURL == "" ) {
			GM_log("GT_Updater not setup correctly. Stopping.");
			turnOff();
			return;
		}
	
		GM_log ("GT_Updater is updating. WW newdid = " + tNewdid + ", Interval (ms) = " + tInterval + "\nSending to: " + tGTURL);
	
		var httpRequest = new XMLHttpRequest();
		var sUrl = "build.php?newdid="+tNewdid+"&gid=17";
		httpRequest.open("GET", sUrl, true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4 && httpRequest.status == 200) {
				GM_setValue("RESPONSE", httpRequest.responseText);
				if ( typeof (newWin) == "undefined" || newWin == null ) newWin = window.open("","GetterToolsWindow");  // Create a new window to put this form in and send off the email. Then trys to close the window after 15 seconds.
				newWin.location = tGTURL;
				setTimeout("newWin = window.open('','GetterToolsWindow'); if (newWin != null) newWin.close();", 7000);
				newWin = null;
			}
		};
		httpRequest.send(null);
	}

// *** MAIN CODE BLOCK ***

	if ( iInterval < 60000 ) {
		turnOff();
	} else if ( oIntervalReference == 0 ) {
		GM_log("Starting GT Updater...  Currently updating every " + (iInterval/60000) + " minute(s).");
		oIntervalReference = window.setInterval(doUpdate, iInterval);
		window.addEventListener('unload', turnOff, false);
	}

	if( iSiteId.length < 1 || temp.length < 1 || tOK == null) {
		if ( t4Marketplace.length < 1 ) {
			GM_log("This is not the marketplace.")
			return false;
		}
	}

	GM_registerMenuCommand("GT Updater: Setup GT updater.", setUpGTU);
}