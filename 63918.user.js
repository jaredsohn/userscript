// ==UserScript==
// @author         The eIndian Footprint
// @name           Transfer weapons quickly for eRepublik Military Tracker
// @namespace      http://www.erepublik.com/en/organization/1859111
// @description    This script enable to transfer items quickly
// @version        1.0.0
// @include        http://*.erepublik.com/*/citizen/donate/items/*
// @include        http://*.erepublik.com/*/organization/donate/items/*
// ==/UserScript==

var eRepublikTransferfood = function() {
	
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(3, 4, 5 ,10);
	
	var moveItems = function() {
	
		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOffood = 0;
		var currentNumber = this.getAttribute('id').charAt(12) * 1;
		
		for (i = 0; i < childNodeArray.length; i++) {
			if ("Food" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOffood < currentNumber) {
				targetNodeArray[numberOffood++] = childNodeArray[i];
			};
		}

		for (i = 0; i < numberOffood; i++) {
			document.getElementById('big').appendChild(targetNodeArray[i]);
		}		
	
	};
	
	for (current in desiredOptions) {
		newButton = buttonContainer.cloneNode(true);
	
		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]);
		
		current % 2 ? newButton.style.clear = "left" : newButton.style.marginLeft = "10px";
	
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Transfer ' + desiredOptions[current] + ' food');

		inputElement.addEventListener('click', moveItems, false);
		
		holderDiv.appendChild(newButton);
	}
};

eRepublikTransferfood();

var eRepublikTransferMT = function() {

	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(3, 4, 5,10);

	var moveItems = function() {

		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOfMT = 0;
		var currentNumber = this.getAttribute('id').charAt(12) * 1;

		for (i = 0; i < childNodeArray.length; i++) {
			if ("Moving Tickets" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfMT < currentNumber) {
				targetNodeArray[numberOfMT++] = childNodeArray[i];
			};
		}

		for (i = 0; i < numberOfMT; i++) {
			document.getElementById('big').appendChild(targetNodeArray[i]);
		}

	};

	for (current in desiredOptions) {
		newButton = buttonContainer.cloneNode(true);

		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]);

		current % 2 ? newButton.style.clear = "left" : newButton.style.marginLeft = "10px";

		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Transfer ' + desiredOptions[current] + ' MT');

		inputElement.addEventListener('click', moveItems, false);

		holderDiv.appendChild(newButton);
	}
};

eRepublikTransferMT();

var eRepublikTransferWeapons = function() {

	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(3, 4, 5, 10);

	var moveItems = function() {

		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOfWeapons = 0;
		var currentNumber = this.getAttribute('id').charAt(12) * 1;

		for (i = 0; i < childNodeArray.length; i++) {
			if ("Weapon" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
				targetNodeArray[numberOfWeapons++] = childNodeArray[i];
			};
		}

		for (i = 0; i < numberOfWeapons; i++) {
			document.getElementById('big').appendChild(targetNodeArray[i]);
		}

	};

	for (current in desiredOptions) {
		newButton = buttonContainer.cloneNode(true);

		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]);

		current % 2 ? newButton.style.clear = "left" : newButton.style.marginLeft = "10px";

		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Transfer ' + desiredOptions[current] + ' weapons');

		inputElement.addEventListener('click', moveItems, false);

		holderDiv.appendChild(newButton);
	}
};

eRepublikTransferWeapons();

var SVC = {

	currentVersion: "1.0.0",
	scriptName: "Transfer weapons quickly for eRepublik Military Tracker",
	scriptNum: 63918,

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

			
			if (!GM_getValue("latest")) GM_setValue("latest", cv );
			if (!GM_getValue("notified")) GM_setValue("notified", false);
			if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");

			
			if (GM_getValue("latest") < cv) {
				GM_setValue("latest", cv);
				GM_setValue("notified", false);
				GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			}
		},

		verifyNotification: function() {
			SVC.userRequestCheck = false;
			var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));

			 
			if (GM_getValue("notified")) {
				if ( sp / (1000*60*60*24) > 0 ) SVC.versionInfo.startXmlHttp();

			
			} else {
				if ( sp / (1000*60*60*24) > 0 ) SVC.versionInfo.startXmlHttp();
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

			
			if (updatedVersion <= GM_getValue("latest",0)) {
				if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest eRepublik script! \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
				return;
			}

			
			if (String(updatedVersion).length == 2) updatedVersion = "0" + String(updatedVersion);
			SVC.latestVersion = String(updatedVersion).replace(/\B/g, ".");

			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");

			
			if (SVC.userRequestCheck) {

				var reply = confirm('Auto-check completed!\n---------------------------\n\nThe eRepublik Script\n~ ' + SVC.scriptName + ' ~\nhas recently been updated to v.' + SVC.latestVersion + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscripts.org now?\n\n  ');

				if (reply) GM_openInTab("http://userscripts.org/scripts/source/" + SVC.scriptNum +".user.js");

			} else {

				var reply = confirm('Latest news for eRepublik Script!\n-----------------------------------------------\n\nThe eRepublik script!\n~ ' + SVC.scriptName + ' ~\nhas recently been updated to v.' + SVC.latestVersion + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to install the userscript  now?\n\n  ');

				if (reply) GM_openInTab("http://userscripts.org/scripts/source/"+ SVC.scriptNum +".user.js");

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
			var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the eRepublik Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to install the userscript now?\n\n  ');
			if (reply) GM_openInTab("http://userscripts.org/scripts/source/"+ SVC.scriptNum +".user.js");
		}

	}

};

window.addEventListener(
  'load',
  function () {
    SVC.versionInfo.autoChecking();
  },
true);


