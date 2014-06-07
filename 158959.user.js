// ==UserScript==
// @name                WME SAMPLE Unlock Requests
// @description         Opens the SAMPLE module with precompiled fields to submit an unlock request
// @grant               none
// @updateURL           https://userscripts.org/scripts/source/158959.user.js
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @version             1
// ==/UserScript==

function SampleUnlscript_global() {
	SampleUnlVersion = '1';
	SampleUnlSheet = 'https://docs.google.com/forms/d/1tVnhEcFEJYQgfpPqrNISCANOToiy4wMlsB_XgW0okb8/viewform';
}

function SampleUnlscript_bootstrap() {
	var bGreasemonkeyServiceDefined = false;

	try {
		if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
			bGreasemonkeyServiceDefined = true;
		}
	}
	catch (err) { //Ignore.
	}

	if (typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined) {
		unsafeWindow = (function() {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		})();
	}

	/* begin running the code! */	
	Sample_coolscript_init();
}

function SampleUnl_WazeBits() {
	SampleUnlselectionManager = unsafeWindow.selectionManager;
	SampleUnlloginManager = unsafeWindow.loginManager;
	wazeModel = unsafeWindow.wazeModel;
	jq = unsafeWindow.jQuery;
}

function SampleUnlinsertButton() {
	if(document.getElementById('SampleUnlock') != null) return;
	
	var btn1 = jq('<a id="SampleUnlock" href="javascript:;" style="margin-right:20px;float:left" title="Opens the sample module to make an unlock request v. '+SampleUnlVersion+'">Unlock Request</a>');
	btn1.click(SampleUnlPermalink);
	jq(".WazeControlPermalink").append(btn1);
	
	consoleLog("SampleUnlock initialised");
}

function SampleUnlgetUsername() {
	var thisUser = SampleUnlloginManager.user;
	if (thisUser === null) {
		alert('Nobody\'s logged in.');
		return "";
	}
	return SampleUnlloginManager.user.userName;
}

//User Rank di un oggetto
function SampleUnluserRank(segment) {
	var usrRank = 0;
	if (segment.attributes.locked) {
		var updatedBy = wazeModel.users.get(segment.attributes.updatedBy);
		return updatedBy != null ? updatedBy.rank : 0;
	}
	return 0;
}

//It returns the maximum lock level
function SampleUnlGetLevel() {
	//attributes.rank dovrebbe essere il road rank
	sel = SampleUnlselectionManager.selectedItems;
	max = SampleUnluserRank(sel[0]);
	for (i = 1; i < sel.length; i++) {
		if (max == 5)
			return 5;
		var usrRank = SampleUnluserRank(sel[i]);
		if (usrRank > max) {
			max = usrRank;
		}
	}
	return max + 1;
}

function SampleUnlPermalink() {
	if (SampleUnlselectionManager.selectedItems.length == 0) {
		alert('No segments selected');
		return;
	}
	var username = SampleUnlgetUsername();
	var lockLevel = SampleUnlGetLevel();
	if (lockLevel == 1) {
		alert("Selected elements are already unlocked");
		return;
	}
	consoleLog("My level: "+SampleUnlloginManager.user.normalizedLevel);
	consoleLog("Lock level: "+lockLevel);
	if (lockLevel <= SampleUnlloginManager.user.normalizedLevel) {
		alert("Selected segments have a lock level that is less or equal to yours.")
		return;
	}
	var permalink = SampleUnlgenerate_permalink();
	consoleLog(permalink);
	permalink = permalink.replace(/&/g, '%26');
	permalink = permalink.replace(/\?/g, '%3F');
	permalink = permalink.replace(/=/g, '%3D');
	//You can get entry numbers in google stylesheet: "Answers->Get precompiled URL"
	var url = SampleUnlSheet + '?entry.985603264=' + username + '&entry.1855493085=' + permalink + '&entry.1219872738=' + lockLevel;
	window.open(url, '_blank');
}

function consoleLog(text) {
	console.log('SampleUnl v. ' + SampleUnlVersion + ': ' + text);
}

function SampleUnlgenerate_permalink() {
	return document.getElementsByClassName('WazeControlPermalink')[0].getElementsByTagName('a')[0].href;
}

function Sample_coolscript_init() {
	SampleUnlscript_global();
	consoleLog('init');
	window.addEventListener("load", function(e) {
		SampleUnl_WazeBits();
		//Inserting the button
		SampleUnlinsertButton();
		return true;
	});
}

SampleUnlscript_bootstrap();