// ==UserScript==
// @name           OTRKeyfinder PG
// @namespace      http://userscripts.org/users/75950
// @description    Program Guide for OTRKeyfinder.com
// @include        http://www.otrkeyfinder.com/?search=*
// @include        http://www.otrkeyfinder.com/index.php?search=*
// @version        0.7.0
// @require        http://userscripts.org/scripts/source/45988.user.js
// ==/UserScript==

var theLinks = Array();
var linkcount = 0;

// SCRIPT VERSION CHECKER
// VERSION 0.7.0
// Checks for updates every day and notifies you again after 14 days if you didn't update
// Uses the @version token inside the ==UserScript== area
var SVC = {

	currentVersion: "0.7.0",
	scriptName: "OTRKeyfinder PG",
	scriptNum: 47781,
	
	currentDate: null,
	latestVersion: null,
	userRequestCheck: null,
	
	trim: function (str, chars) {
		return SVC.ltrim(SVC.rtrim(str, chars), chars);
	},
 
	ltrim: function (str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	},
 
	rtrim: function (str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
	},
	
	versionInfo: {

		init: function () {
			SVC.currentDate = new Date();
			var cv = parseInt( String(/[1-9].*/.exec(SVC.currentVersion)).replace(/\./g, "") );
			
			// INITIALIZE LOCAL VALUES (FOR FIRST-TIME USE)
			if (!GM_getValue("latest")) GM_setValue("latest", cv );
			if (!GM_getValue("notified")) GM_setValue("notified", false);
			if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
			
			// UPDATE LOCAL VALUES (FOR FIRST-TIME USE AFTER REINSTALL NEWER VERSION)
			if (GM_getValue("latest") < cv) {
				GM_setValue("latest", cv);
				GM_setValue("notified", false);
				GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			}
		},
		
		verifyNotification: function() {
			SVC.userRequestCheck = false;
			var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
			
			// CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION BEFORE AND 14 DAYS HAVE PASSED
			if (GM_getValue("notified")) {
				if ( sp / (1000*60*60*24) > 14 ) SVC.versionInfo.startXmlHttp();
				
			// CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE LAST CHECKED
			} else {
				if ( sp / (1000*60*60*24) > 1 ) SVC.versionInfo.startXmlHttp();
			}		
		},
		
		startXmlHttp: function () {	
			try {
				GM_xmlhttpRequest({
					method: 'GET', url: "http://userscripts.org/scripts/review/" + SVC.scriptNum, 
					onload: function(responseDetails) {
						if (responseDetails.status == 404) {
							if (SVC.userRequestCheck) SVC.versionInfo.manualErrorMsg();

						} else if (responseDetails.status == 200) {
							var newElem = document.createElement('div');
							newElem.innerHTML = responseDetails.responseText;
							//newElem.style.display = 'none';
                                          		//newElem.getElementsByClassName('ad')[0].innerHTML='';
							//document.body.appendChild(newElem);
							var theSource = newElem.getElementsByTagName('pre')[0];
							//alert(theSource.innerHTML);
							var uv = SVC.versionInfo.processResponseText(theSource);
							if (uv) {
								SVC.updatedVersion = parseInt(uv.replace(/\./g, ""));
								SVC.versionInfo.compareVersions(SVC.updatedVersion);
							} else {
								if (SVC.userRequestCheck) SVC.versionInfo.manualErrorMsg();
							}
                                          		//newElem.parentNode.removeChild(newElem);
						}

					}
				});
			}
			catch(err) {
			}
		},
			
		processResponseText: function (theNewElem) {
		    var versionfound = false;
		    var theVersionPart;
	    	    var theLines = theNewElem.innerHTML.split('\n');
	    	    for(i=0; i<theLines.length; i++) {
	    	    	theLines[i]=SVC.trim(theLines[i]);
	    	        if(theLines[i].indexOf('// @version')==0) {
	    	            versionfound = true;
	    	            theVersionPart = SVC.trim(theLines[i].substring(11));
	    	        }
	    	    }
	    	    if(versionfound) {
	    	        return theVersionPart;
	    	    } else {
	    	        return false;
	    	    }
		},

		compareVersions: function (updatedVersion) {
			
			// DO NOTHING IF NO CHANGE IN VERSIONS
			if (updatedVersion <= GM_getValue("latest",0)) {
				if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			// UPDATE LOCAL VALUES			
			if (String(updatedVersion).length == 2) updatedVersion = "0" + String(updatedVersion);
			SVC.latestVersion = String(updatedVersion).replace(/\B/g, ".");
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			// NOTIFY USER
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script\n~ ' + SVC.scriptName + ' ~\nhas recently been updated to v.' + SVC.latestVersion + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscripts.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
				
			} else {
			
				var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script\n~ ' + SVC.scriptName + ' ~\nhas recently been updated to v.' + SVC.latestVersion + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscripts.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
			
			}
		},
		
		autoChecking: function () {
			SVC.versionInfo.init();
			SVC.versionInfo.verifyNotification();
		},
		
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.versionInfo.startXmlHttp();
		},

		manualErrorMsg: function () {
			var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscripts.org now?\n\n  ');
			if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
		},
		
	}

};


window.addEventListener(
  'load',
  function () {
    USP.theScriptName='OTRKeyfinder PG';
    USP.init({theName:'ShowDivX', theText:'DivX anzeigen?', theDefault:true},
             {theName:'ShowMP4', theText:'MP4 anzeigen?', theDefault:false},
             {theName:'ShowHQ', theText:'HQ anzeigen?', theDefault:false},
			 {theName:'ShowHD', theText:'HD anzeigen?', theDefault:false}
	);
    GM_registerMenuCommand('Einstellungen fuer ~'+USP.theScriptName+'~', USP.invoke);
    SVC.versionInfo.autoChecking();
    theLinks = document.getElementsByClassName('searchResult');
    linkcount = theLinks.length;
    if(linkcount>0) {
	// Show all
	var showMP4 = USP.getValue('ShowMP4');
	var showHQ = USP.getValue('ShowHQ');
	var showDivX = USP.getValue('ShowDivX');
	var showHD = USP.getValue('ShowHD');
	var SortOrder = USP.getValue('SortOrder');
	// Get rid off not to be shown content
	for (var j=theLinks.length-1; j>=0; j--) {
		if ((showMP4==false && theLinks[j].textContent.indexOf('mp4.otrkey')!=-1) || (showHQ==false && theLinks[j].textContent.indexOf('HQ.avi.otrkey')!=-1) || (showDivX==false && theLinks[j].textContent.indexOf('mpg.avi.otrkey')!=-1) || (showHD==false && theLinks[j].textContent.indexOf('mpg.HD')!=-1)) {
			theLinks[j].parentNode.removeChild(theLinks[j]);
		}
	}
	// Set sort order Date/Time, update search
	var theCheckbox=document.getElementById('order2');
	if(!theCheckbox.checked) {
		document.getElementById('order2').checked='checked';
		document.getElementsByTagName('form')[0].submit();
	}
    }
  },
true);
