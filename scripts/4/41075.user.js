/*

	Script Version
	Initial release: 24 Jan 2009 (0.1.0)
	This release: 2 Feb 2011 (0.3.1)
	
	Version 0.3.1 removes bug -> "Error: uncaught exception: ReferenceError: udatedVersionInt is not defined"
	Version 0.3.0 frees bugs related to version, waiting time and user notification.
	Version 0.2.0 frees the necessity of having the version placed within (and only) at the title field. By making use of metadata block, version information can now be put at the summary/description section to inform users of the latest. Even so, the script will still work if only the title field is used.
	
	REQUIRES
	* * * * * * *
	Either:
	1. Any non-space version reference placed at the metadata block in the script itself or
	2. Any non-space version reference placed at the end of the title on the uso download page 
	
	THE SETUP
	* * * * * * *
	1.
	- To use the metadata block, use the line: // @svc:version [x.x.x]. Example "// @svc:version [0.3.0]"
	- To use the uso download page, include the reference in the title. Example "Script Version Checker 0.3.0"
	
	2. Copy the whole of var SVC = { }; to the targeted script
	3. Update the 3 variables currentVersion, scriptName and scripNum in the code
	
	TO USE
	* * * * * * *
	1. For auto notification, include this... SVC.versionInfo.autoChecking();
		- The codes will compare the working copy with source once a day till a newer version of the script is found.
		- Once a version is found and the user have yet to download the latest, these codes will then compare the working copy with source every 14 days.
		
	2. For manual checking by user, include this... SVC.versionInfo.manualChecking
	
	HOW IT WORKS
	* * * * * * *
	The script will verify with the metadata block first. If no such metadata block is found, it will then check the title at the uso download page.
	
*/

// ==UserScript==
// @name           Script Version Checker
// @namespace      http://userscripts.org/scripts/show/41075
// @description    For use by the greasemonkey scripts developer to notify users automatically and/or manually of any script version changes found in userscript.org. Integrate into any scripts. Uses version referencing.
// @include        *
// @exclude
// @svc:version    [0.3.0]
// ==/UserScript==

var SVC = {
	currentVersion: "0.2.9", // Needed to compare working version with the download version at userscript.org
	scriptName: "Script Version Checker", // Used in the message to users of any version changes to the script
	scriptNum: 41075, // Needed to connect to the download page at userscript.org
	
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
