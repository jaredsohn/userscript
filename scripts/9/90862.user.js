// ==UserScript==
// @name           Gart Goddammit
// @namespace      GLB
// @include        http://goallineblitz.com/*
// @include        https://goallineblitz.com/*
// @svc:version    [0.8.7]
// ==/UserScript==

var SVC = {
	currentVersion: "0.8.7", // Needed to compare working version with the download version at userscript.org
	scriptName: "Gart Goddammit", // Used in the message to users of any version changes to the script
	scriptNum: 90862, // Needed to connect to the download page at userscript.org
	
	// GLOBAL SETTINGS
	currentDate: null, userRequestCheck: null, timer: null,
	
	init: function () {
		SVC.currentDate = new Date();
		var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

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
	verify: function () {
		SVC.userRequestCheck = false;
		var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
		
		// CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION BEFORE AND 14 DAYS HAVE PASSED
		if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();
			
		// CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE LAST CHECKED
		if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
	},
	getInfo: function () {	
		var uso = 'http://userscripts.org';
		function retrieve(url, re, count) {
			SVC.xhr.get(url, function (status, text) {
				window.clearTimeout(SVC.timer);
				if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
				if (status == 200) {
					if (re.test(text)) var uv = re.exec(text)[1];
					if (uv) SVC.compare(uv);
					if (!uv && count == 1) {
						retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					} else if (!uv && SVC.userRequestCheck) {
						SVC.manualErrorMsg();
					}
				}
			});
			SVC.timer = setTimeout(function () { 
				if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
				if (count == 2) 
					if (SVC.userRequestCheck) SVC.manualErrorMsg(); // *new in v0.3.0* notify only if it is a user request check
					else GM_setValue("lastChecked", SVC.currentDate.getTime() + ""); // *new in v0.3.0* the next check will be on the next day
			}, 3000); // *new in v0.3.0* change to 3secs to allow more time for heavy loaded sites
		};
		retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
	},
	xhr: {
		get: function (url, process) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function (res) { process(res.status, res.responseText); },
			});
		},
	},
	compare: function (version) {
			
			var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));		
			
			// *NEW IN v0.3.0* 
			// IF UPDATEDVERSIONINT IS NOT A NUMBER...
			if (isNaN(updatedVersionInt)) {
				if (SVC.userRequestCheck) SVC.manualErrorMsg();
				else GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
				return;
			}
			
			// DO NOTHING IF NO CHANGE IN VERSIONS
			if (updatedVersionInt <= GM_getValue("latest")) {
				if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			// NOTIFY USER
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
				
			} else {
			
				var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
			
			}
		},
	versionInfo: {
		autoChecking: function () {
			SVC.init();
			SVC.verify();
		},
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.getInfo();
		},
	},
	manualErrorMsg: function () {
		var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscript.org now?\n\n  ');
		if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
	},
};

GM_registerMenuCommand("Script Version Checker (Check Latest Version)", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"Finhali Demotied" : "finHali demoTied",
"Moose Jaw Roughriders" : "Moose, No Hobo",
"Brooklyn Breast Milk" : "I Love Big Breasteses",
"Crouching African Hidden Elephants" : "2000 Called.  It Said You Need a New Name",
"NBA Jam Arcade" : "Still Terrible Gart.",
"Lincoln Navigators" : "Might Finally Win WL...Or Not",
"Saigon Whores" : "Saigon Hookers Inc.",
"Chocolate Blaze" : "Terrible Gart.  Just Terrible.",
"Cobra Kai" : "LOL Cobra Cry!",
"Alpine__" : "Alpine No Underlines",
"Black Sea Sunami" : "Black Sea Tsunami",
"The Osaka Buckeyes" : "The Osucka Buckeyes",
"Royal Blue Drunken Smurfs of Funkalicious Labatt" : "Smurfs",
"The New York Empire" : "New York State of Mind",
"Death Valley Fightin' Tigers" : "Death Valley Fightin' Tiger Blood",
"Odessa Mojo" : "Down with OPP",

///////////////////////////////////////////////////////
"":""};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}