// ==UserScript==
// @name                WME Croatian Unlock Requests
// @description         Opens the Croatian module with precompiled fields to submit an unlock request
// @grant               none
// @updateURL           http://userscripts.org/scripts/source/163044.user.js
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @version             1.2
// ==/UserScript==

function CroatianUnlscript_global() {
	CroatianUnlVersion = '1.2';
	CroatianUnlSheet = 'https://docs.google.com/forms/d/1N5UKBWflq_2o99sP-l8fez38Fq4rF7twllj6pAwUu4I/viewform';
}

function CroatianUnlscript_bootstrap() {
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
	Croatian_coolscript_init();
}

function CroatianUnl_WazeBits() {
	CroatianUnlselectionManager = unsafeWindow.selectionManager;
	CroatianUnlloginManager = unsafeWindow.loginManager;
	wazeModel = unsafeWindow.wazeModel;
	jq = unsafeWindow.jQuery;
}

function CroatianUnlinsertButton() {
	if(document.getElementById('CroatianUnlock') != null) return;
	
	var btn1 = jq('<a id="CroatianUnlock" href="javascript:;" style="margin-right:20px;float:left" title="Otvori modul za izvršiti zahtijev Unlock-a v. '+CroatianUnlVersion+'">Zahtijev za Unlock</a>');
	btn1.click(CroatianUnlPermalink);
	jq(".WazeControlPermalink").append(btn1);
	
	consoleLog("CroatianUnlock initialised");
}

function CroatianUnlgetUsername() {
	var thisUser = CroatianUnlloginManager.user;
	if (thisUser === null) {
		alert('Nitijedan logirani korisnik.');
		return "";
	}
	return CroatianUnlloginManager.user.userName;
}

//User Rank di un oggetto
function CroatianUnluserRank(segment) {
	var usrRank = 0;
	if (segment.attributes.locked) {
		var updatedBy = wazeModel.users.get(segment.attributes.updatedBy);
		return updatedBy != null ? updatedBy.rank : 0;
	}
	return 0;
}

//It returns the maximum lock level
function CroatianUnlGetLevel() {
	//attributes.rank dovrebbe essere il road rank
	sel = CroatianUnlselectionManager.selectedItems;
	max = CroatianUnluserRank(sel[0]);
	for (i = 1; i < sel.length; i++) {
		if (max == 5)
			return 5;
		var usrRank = CroatianUnluserRank(sel[i]);
		if (usrRank > max) {
			max = usrRank;
		}
	}
	return max + 1;
}

function CroatianUnlPermalink() {
	if (CroatianUnlselectionManager.selectedItems.length == 0) {
		alert('Niti jedan odabrani segment.');
		return;
	}
	var username = CroatianUnlgetUsername();
	var lockLevel = CroatianUnlGetLevel();
	if (lockLevel == 1) {
		alert("Odabrani segmenti su vec Unlock-ani.");
		return;
	}
	consoleLog("My level: "+CroatianUnlloginManager.user.normalizedLevel);
	consoleLog("Lock level: "+lockLevel);
	if (lockLevel <= CroatianUnlloginManager.user.normalizedLevel) {
		alert("Odabrani segmenti imaju isti ili manji level od tvoga.")
		return;
	}
	var permalink = CroatianUnlgenerate_permalink();
	consoleLog(permalink);
	permalink = permalink.replace(/&/g, '%26');
	permalink = permalink.replace(/\?/g, '%3F');
	permalink = permalink.replace(/=/g, '%3D');
	//You can get entry numbers in google stylesheet: "Answers->Get precompiled URL"
	var url = CroatianUnlSheet + '?entry.903600815=' + username + '&entry.1300749653=' + permalink + '&entry.1979214050=' + lockLevel+'&entry.269432155=Ne';
	window.open(url, '_blank');
}

function consoleLog(text) {
	console.log('CroatianUnl v. ' + CroatianUnlVersion + ': ' + text);
}

function CroatianUnlgenerate_permalink() {
	return document.getElementsByClassName('WazeControlPermalink')[0].getElementsByTagName('a')[0].href;
}

function Croatian_coolscript_init() {
	CroatianUnlscript_global();
	consoleLog('init');
	window.addEventListener("load", function(e) {
		CroatianUnl_WazeBits();
		//Inserting the button
		CroatianUnlinsertButton();
		return true;
	});
}

CroatianUnlscript_bootstrap();