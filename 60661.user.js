// ==UserScript==
// @name           Facebook - Fish  Wrangler Auto-Fish
// @include        http://apps.facebook.com/fishwrangler/*
// @include        http://apps.new.facebook.com/fishwrangler/*
// @namespace      fishwrangler
// ==/UserScript==

//Attempt to fish every 15 minutes,
//regardless what page in Fish Wrangler you are on.

//taken from mafia wars auto player
var SCRIPT = {
url: 'http://userscripts.org/',
	 version: '0.0.3',
	 build: '10',
	 name: 'fishwrangler',
	 appID: 'app8138090269',
	 ajaxPage: '',
	 presentationurl: ''
};


//setTimeout(function() { document.location = 'http://apps.facebook.com/fishwrangler/start'; } , 932000);

var gameLoop = function() {
	GM_log('game loop');
	if (GM_getValue('tournyFish') == 'On') {
		var tournyResult = performTournyFishing();
		if(tournyResult == 1) {
	GM_log('Good tourny cast');
			return;
		} else if (tournyResult == -1) {
			//GM_log('error tourny fishing');
			document.getElementById('lbl_tournystate').innerHTML = '<span style="color:#C33">Err</span>';
			//don't return, try regular fishing
		}
	} else {
//		GM_log('doesn\'t want to check tournament');
	}

	if (GM_getValue('regularFish') == 'On') {
		var regularResult = performRegularFishing();
		if (regularResult == 1) {
	GM_log('Good regular cast');
			return;
		} else if (regularResult == -1) {
			//GM_log('error regular fishing');
			document.getElementById('lbl_regularstate').innerHTML = '<span style="color:#C33">Err</span>';
			//don't return, allow another game loop
		}
	}
	//35 seconds to rescan
	setTimeout( gameLoop, 35000);
}

//attempt to scan for "fish now" links every 1 minute
var performRegularFishing = function() {

	//if out of chum, don't try to fish
	var chum = document.evaluate(
			'//a[@href="/fishwrangler/customize/chum" and contains(@class, "red")]', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
	if (chum.snapshotLength > 0) {
		//treasure on screen, can't fish until
		//human interacts with CAPTCHA
//		GM_log('No chum, can\'t fish until selection is made.');
		return -1;
	}

	var anchors = document.evaluate(
			'//a[@href="/fishwrangler/start"]', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
	if (anchors.snapshotLength > 0) {
		document.location = 'http://apps.facebook.com/fishwrangler/start';
		return 1;
	}
	//no anchors, if no treasure chests, check 
	//again for anchors
	//
	var treasure = document.evaluate(
			'//input[@name="treasure"]', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
	if (treasure.snapshotLength > 0) {
		//treasure on screen, can't fish until
		//human interacts with CAPTCHA
//		GM_log('Treasure chests, can\'t fish until selection is made.');
		return -1;
	}
	return 0;
}

function performTournyFishing() {

	//if out of chum, don't try to fish
	var chum = document.evaluate(
			'//a[@href="/fishwrangler/customize/chum" and contains(@class, "red")]', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
	if (chum.snapshotLength > 0) {
		//treasure on screen, can't fish until
		//human interacts with CAPTCHA
//		GM_log('No chum, can\'t fish until selection is made.');
		return -1;
	}

	var anchors = document.evaluate(
			'//a[@href="/fishwrangler/cast"]', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
	if (anchors.snapshotLength > 0) {
		document.location = 'http://apps.facebook.com/fishwrangler/cast';
		return 1;
	}
	return 0;
}

function updateElement(id, attributes) {
	var elt = document.getElementById(id);
	if (attributes != null) {
		for (var i in attributes) {
			elt.setAttribute(i, attributes[i]);
		}
	}
}

//taken from mafia wars auto player
function makeElement(type, appendto, attributes, checked, chkdefault) {
	var element = document.createElement(type);
	if (attributes != null) {
		for (var i in attributes) {
			element.setAttribute(i, attributes[i]);
		}
	}
	if (checked != null) {
		if (GM_getValue(checked, chkdefault) == 'checked') {
			element.setAttribute('checked', 'checked');
		}
	}
	if (appendto) {
		appendto.appendChild(element);
	}
	return element;
}

function act_tournyToggle() {
	if (GM_getValue('tournyFish', 'Off') == 'Off') {
		GM_setValue('tournyFish', 'On');
		document.getElementById('lbl_tournystate').innerHTML = 'On';
	} else {
		GM_setValue('tournyFish', 'Off');
		document.getElementById('lbl_tournystate').innerHTML = 'Off';
	}
	act_updateLabelState();
}
function act_regularToggle() {
	if (GM_getValue('regularFish', 'Off') == 'Off') {
		GM_setValue('regularFish', 'On');
		document.getElementById('lbl_regularstate').innerHTML = 'On';
	} else {
		GM_setValue('regularFish', 'Off');
		document.getElementById('lbl_regularstate').innerHTML = 'Off';
	}
	act_updateLabelState();
}

function act_updateLabelState() {
	if (GM_getValue('regularFish', 'Off') == 'On') {
		updateElement('lbl_regularstate', {'class':'bold green tiny'});
	} else {
		updateElement('lbl_regularstate', {'class':'bold red tiny'});
	}
	if (GM_getValue('tournyFish', 'Off') == 'On') {
		updateElement('lbl_tournystate', {'class':'bold green tiny'});
	} else {
		updateElement('lbl_tournystate', {'class':'bold red tiny'});
	}
}



function initUi() {
	var fwapTitle = 'FFWAP ' + SCRIPT.version + ' (Build ' + SCRIPT.build + ')';
	var mastheadElt = document.getElementById(SCRIPT.appID + '_mainmenucontainer');
	var displayElt = makeElement('div', mastheadElt, {'style':'float:left; text-align: left; font-size: 11px; font-weight: bold; color: #333'}).appendChild(document.createTextNode(fwapTitle));

	mastheadElt.appendChild(document.createTextNode(' '));
	var tournyButton = makeElement('span', mastheadElt, {'style':'cursor:pointer;margin-left:10px;left: 10px; bottom: 10px;'});
	var tournyDiv = makeElement('span', tournyButton).appendChild(document.createTextNode('Tourny Auto-Fishing: '));
	makeElement('span', tournyButton, {'id':'lbl_tournystate'}).appendChild(document.createTextNode(GM_getValue('tournyFish', 'Off')));
	tournyButton.addEventListener('click', act_tournyToggle, false);

	var regularButton = makeElement('span', mastheadElt, {'style':'cursor:pointer;margin-left:20px;left: 10px; bottom: 10px;'});
	var regularDiv = makeElement('span', regularButton).appendChild(document.createTextNode('Regular Auto-Fishing: '));
	makeElement('span', regularButton, {'id':'lbl_regularstate'}).appendChild(document.createTextNode(GM_getValue('regularFish', 'Off')));
	regularButton.addEventListener('click', act_regularToggle, false);

	act_updateLabelState();
}

//GM_log(' auto fish : '+GM_getValue('regularFish'));
initUi();
//12 seconds for the first time search on a page load
setTimeout( gameLoop, 12000);
