// ==UserScript==
// @name            Zoo world Post Deleter
// @namespace       http://htmlblog.net
// @description     remove old game post from zooworld and a few others  
// @version         1.2
// @include         http*://www.facebook.com/*
// ==/UserScript==


(function () {

//
// custom settings
//
var tDiffMax = 2, // remove posts older then 2 hours
    appIDs = Array( // ID's of applications to remove            
             '10979261223', // Mafia Wars
             '234860566661', // Treasure Isle
             '46755028429', // Castle Age
             '102452128776', // FarmVille
             '130402594779', // Kingdoms of Camelot
             '167746316127', // Zoo world
             '2345673396', // Hug me
             '2405948328', // likeness
             '2339854854', // Horoscopes
             '14852940614', // Birthday cards
             '2601240224', // Rockyou live
             '342684208824', // Backyard Monsters
             '2389801228', // Texas HoldEm Poker
             '62181482841', // Games
             ''),
    autorun = false, // start automatically (works only in Opera)
    isDebug = true, // debug mode
    xhr_delay = 300; // XMLHttpRequest delay 2 in ms (you don't want to remove all posts at once)

//
// script informations
//
var ZWPD = {
	name: 'Facebook - ZWPD (zoo world post deleter)',
	tag: 'FB_ZWPD_',
	id: '92953',
	ver: '1.60',
	url: 'http://userscripts.org/scripts/show/92953',
	meta: 'http://userscripts.org/scripts/source/92953.meta.js',
	updateInterval: 6 // hours
};



if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }

// don't run in frames, except updater
if (!unsafeWindow.location.href.match(ZWPD.meta)) {
	if (self != window.top) { return; }
}

// detect Chromium browser - finally working code
var getDOMWindow = function() {
	var elt = document.createElement("div");
	elt.setAttribute("onclick", "return window;");
	return elt.onclick();
}
if (typeof chrome  !== 'undefined' && chrome.extension) {
	unsafeWindow = getDOMWindow();
}

//
// some helpfull functions
//
function onClick(elm, func) { (typeof elm === 'string' ? $('#'+elm) : elm).addEventListener('click', func, false); }

function destroy(elm) { if (elm && elm.parentNode) elm.parentNode.removeChild(elm); }

function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

function xhr(url, cb, data) {
	var res =  new XMLHttpRequest();
	res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
	res.open(data ? 'POST' : 'GET', url, true);
	res.setRequestHeader('User-agent', window.navigator.userAgent);
	if (data) {
		res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		res.setRequestHeader('Connection', 'close');
		res.setRequestHeader('Content-length', data.length);
	}
	res.send(data||null);
}

function pausecomp(millis) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

//
// write debug info to console
//
function debugMsg(str) {
	if (!isDebug) return false;
	str = ZWPD.tag + ': ' + str;
	if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
	if (typeof opera !== 'undefined' && opera.postError) { opera.postError(str); return true; }
	if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
	alert(str);
	return false;
}

//
// prepare data storage functions
//
function storageInit() {
	debugMsg('initialize data storage');

	// detect available storage type
	var storage = 'none';
	try {
		if (typeof GM_getValue == 'function' && typeof GM_setValue == 'function') {
			// test if greasemonkey's functions work.
			GM_setValue('ZWPDtestkey', 'ZWPDtestvalue');
			if (GM_getValue('ZWPDtestkey', false) == 'ZWPDtestvalue') { storage = 'greasemonkey'; }
		}
	} catch(x) {}
	if (storage == 'none' && typeof localStorage == 'object') { storage = 'localstorage'; }
	debugMsg('storage type=' + storage);

	// Opera Greasemonkey support
	if (storage == 'localstorage' && typeof opera !== 'undefined') {
		var GMemu_url = 'http://userscripts.org/scripts/show/88932'
		if (confirm('Opera have no built in Greasemonkey suport.\n' +
		            'Please install Greasemonkey Emulation script.\n' +
		            'URL: ' + GMemu_url +  '\n\n' +
		            'Do you want to install now?')) {
			unsafeWindow.open(GMemu_url, '_blank');
		}
	}

	// some shitty browser detected
	if (storage == 'none') {
		alert('Sorry but your browser sux ...\n' +
		      'No permanent storage detected - initiating temporary storage.\n' +
		      'All changes will be lost after page refresh!');
		localStorage = new (function() {
			var tmp_array = [];
			this.setItem = function(name, value){
				tmp_array[name] = value;
			},
			this.getItem = function(name) {
				return tmp_array[name] || null;
			},
			this.removeItem = function(name) {
				tmp_array[name] = null;
			}
			return this;
		})();
		storage = 'fakestorage';
	}

	// fake GM_ functions
	if (storage == 'localstorage' || storage == 'fakestorage') {
		GM_setValue = function(name, value) {
			localStorage.setItem(name, value);
		}
		GM_getValue = function(name, defaultValue) {
			return localStorage.getItem(name) || defaultValue;
		}
		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}
	}

}

//
// function to handle configuration data
//
var ZWPDoptions = new (function() {
	this.set = function(key, value){
		GM_setValue(ZWPD.tag + key, value);
	},
	this.get = function(key, defaultValue) {
		return GM_getValue(ZWPD.tag + key) || defaultValue;
	},
	this.remove = function(key) {
		GM_deleteValue(ZWPD.tag + key);
	}
	return this;
})();


//
// Updater - check for script update
//
function updaterStart(scriptInfo, metadata) {
	debugMsg('updater - check update');

	var metaID = metadata.match(/@uso:script\s*(.+)/)[1];
	var metaVer = metadata.match(/@version\s*(.+)/)[1];
	/*debugMsg('' +
	         'scriptInfo.id=' + scriptInfo.id + '\n' +
	         'metaID=' + metaID + '\n' +
	         'scriptInfo.ver=' + scriptInfo.ver + '\n' +
	         'metaVer=' + metaVer + '\n' +
	         '');*/
	if (metaID == scriptInfo.id && metaVer !== scriptInfo.ver) {
		if (confirm('UPDATE FOUND\n\n' +
		           scriptInfo.name + '\n' +
		           'installed version: ' + scriptInfo.ver + '\n' +
		           'actual version: ' + metaVer + '\n' +
		           'update URL: ' + scriptInfo.url +  '\n\n' +
		           'Do you want to update now?')) {
			unsafeWindow.open(scriptInfo.url, '_blank');
		}
	}
}

//
// Updater - add iframe
//
function updaterFrame(updateSrc) {
	debugMsg('updater - create iFrame');

	if ($('#ZWPDupdater')) return;
	try {
		var newZWPDupdater = document.createElement('iframe');
		newZWPDupdater.id = 'ZWPDupdater';
		newZWPDupdater.setAttribute('style', 'display: none;');
		//newZWPDupdater.setAttribute('style', 'width:500px; height:300px; border:1px solid red; display: block;');
		newZWPDupdater.src = updateSrc;
		$('body')[0].appendChild(newZWPDupdater);
	} catch(x) { debugMsg('updaterFrame error:'+x); }
}

//
// Updater - initialize
//
function updaterInit() {
	debugMsg('updater - initialize');

	setTimeout(function() {
		var now = new Date().getTime();
		var updateInterval = ZWPD.updateInterval * 60 * 60 * 1000;
		var lastUpdateCheck = ZWPDoptions.get('lastUpdateCheck', 0)*1;
		/*debugMsg('' +
		         'now.toLocaleString()=' + now.toLocaleString() + '\n' +
		         'lastUpdateCheck.toLocaleString()=' + lastUpdateCheck.toLocaleString() + '\n' +
		         'updateInterval=' + updateInterval + '\n' +
		         '');*/
		if (now > (lastUpdateCheck + updateInterval)) {
			updaterFrame(ZWPD.meta + '?' + now);
			ZWPDoptions.set('lastUpdateCheck', now+'');
		}
	}, 3000);
}


//
// do the dirty job
//
function ZWPDprocess() {

	// run only on profile page
	var elmStream, elmTime, profile = ZWPDisProfile();
	if (!profile) return;
	if (profile==1) {
		elmStream = '#profile_minifeed';
		elmTime = '.uiStreamSource';
	}
	if (profile==2) {
		elmStream = '#profile_stream_container';
		elmTime = '.UIIntentionalStory_Time';
	}
	debugMsg('' +
	         'profile=' + profile + '\n' +
	         'elmStream=' + elmStream + '\n' +
	         'elmTime=' + elmTime + '\n' +
	         '');
	ZWPDcreateInfoDiv(elmStream);

	debugMsg('process');
	ZWPDinfo('ZWPD: processing. (click to hide)')

	var fb_user = unsafeWindow.Env.user,
	    user2check = 'contains(@data-ft,\'"actrs":"' + fb_user + '"\') and ',
	    apps2check = Array();
	if (profile==1)
		apps2check.push('contains(@data-ft,\'"app_id":' + appIDs.join('\') or contains(@data-ft,\'"app_id":') + '\')');
	else if (profile==2)
		apps2check.push('contains(@data-ft,\'"app_id":"' + appIDs.join('"\') or contains(@data-ft,\'"app_id":"') + '"\')');

	debugMsg('' +
	         'fb_user=' + fb_user + '\n' +
	         'user2check=' + user2check + '\n' +
	         'tDiffMax=' + tDiffMax + '\n' +
	         'xhr_delay=' + xhr_delay + '\n' +
	         'appIDs=' + appIDs + '\n' +
	         'apps2check=' + apps2check + '\n' +
	         '');

	// select matching elements
	var elms = $('.//*[' + user2check + apps2check + ']', $(elmStream));
	debugMsg('elms.snapshotLength=' + elms.snapshotLength);
//	debugMsg('elms.snapshotItem(0).innerHTML=' + elms.snapshotItem(0).innerHTML);

	var story_time, tDiff,
	    nTotal = elms.snapshotLength;
	    nExpired = elms.snapshotLength; // change later
	var tStory = new Date(), // story time
	    tNow = new Date(); // current time
	    tNow.getTime();


	// find first expired item
	for (var i=0; i<nTotal; i++) {

		story_time = $(elmTime,elms.snapshotItem(i))[0].firstChild.firstChild.getAttribute('data-date');
		tStory.setTime(Date.parse(story_time));
		tDiff = Math.floor((tNow-tStory)/1000/60/60); // difference in full hours

		/*debugMsg('' +
		         'element=' + i + '\n' +
		         'tStory.toLocaleString()=' + tStory.toLocaleString() + '\n' +
		         'tNow.toLocaleString()=' + tNow.toLocaleString() + '\n' +
		         'diff in hours=' + tDiff + '\n' +
		         '');*/

		if (tDiff >= tDiffMax) {
			nExpired = i;
			break;
		}
	}

	debugMsg('first expired=' + nExpired);

	var story_type, story_key, clbtn
	    xhr_pfID = unsafeWindow.Env.post_form_id,
	    xhr_fbdtsg = unsafeWindow.Env.fb_dtsg;

	debugMsg('' +
	         'xhr_delay=' + xhr_delay + '\n' +
	         'xhr_pfID=' + xhr_pfID + '\n' +
	         'xhr_fbdtsg=' + xhr_fbdtsg + '\n' +
	         '');

	// remove all expired
	for (var i=nExpired; i<nTotal; i++) {

		clbtn = $('.uiCloseButton',elms.snapshotItem(i))[0];
		story_type = clbtn.getAttribute('ajaxify').match(/story_type=(\d+)/i)[1];
		story_key = clbtn.getAttribute('ajaxify').match(/story_key=(\d+)/i)[1];

		/*debugMsg('' +
		         'story_type=' + story_type + '\n' +
		         'story_key=' + story_key + '\n' +
		         '');*/

		pausecomp(xhr_delay); // don't send all requests at once ...
		xhr('http://www.facebook.com/ajax/minifeed.php?__a=1', function() {},
		    'profile_fbid=' + fb_user +
		    '&ministory_key=' + story_key +
		    '&story_type=' + story_type +
		    '&post_form_id=' + xhr_pfID +
		    '&post_form_id_source=AsyncRequest' +
		    '&fb_dtsg=' + xhr_fbdtsg
		   );
		destroy(elms.snapshotItem(i));
	}
	ZWPDinfo('ZWPD: ' + nTotal + ' posts total, ' + (nTotal - nExpired) + ' old posts removed. (click to hide)')

}


//
// show info in ZWPDinfo div
//
function ZWPDinfo(text) {
	debugMsg('info: "'+text+'"');

	var result = $('#ZWPDinfo');
	result.innerHTML = text;
	result.style.visibility = 'visible';
}

//
// create div for ZWPD informations
//
function ZWPDcreateInfoDiv(elm) {
	debugMsg('create info div');

	if ($('#ZWPDinfo')) return;
	try {
		var newZWPDinfo = document.createElement('div');
		newZWPDinfo.id = 'ZWPDinfo';
		newZWPDinfo.style.visibility = 'hidden';
		newZWPDinfo.style.border = '1px dotted grey';
		newZWPDinfo.innerHTML = 'ZWPD: information area. (click to hide)';
		onClick(newZWPDinfo, function() { this.style.visibility='hidden'; });
		$(elm).insertBefore(newZWPDinfo,$(elm).firstChild);
	} catch(x) { debugMsg('ZWPDcreateInfoDiv error:'+x); }
}

//
// create button on right side of top menu
//
function ZWPDcreateRunButton() {
	debugMsg('create run button');

	if ($('#ZWPDbutton')) return;
	try {
		var newZWPDbutton = document.createElement('li');
		newZWPDbutton.id = 'ZWPDbutton';
		newZWPDbutton.innerHTML = '<a title=\'remove old "game" posts\'>ZWPD</a>';
		onClick(newZWPDbutton, function() { ZWPDprocess(); });
		$('#pageNav').appendChild(newZWPDbutton);
	} catch(x) { debugMsg('ZWPDcreateRunButton error:'+x); }
}

//
// detect profile page
//
function ZWPDisProfile() {
	debugMsg('detect user profile');

	var user_profile_new = $('//a[contains(@class,\'edit_profilepicture\')]', $('#leftCol'));
	if (user_profile_new.snapshotLength) {
		debugMsg('current page is user profile (new) -> go');
		return 1;
	}
	var user_profile_old = $('//div[contains(@class,\'can_edit\')]', $('#left_column'));
	if (user_profile_old.snapshotLength) {
		debugMsg('current page is user profile (old) -> go');
		return 2;
	}
	debugMsg('current page isn\'t user profile -> stop');
	return 0;
}

//
// start script
//
function ZWPDstart() {
	debugMsg('DOMContentLoaded\n'+
	         'unsafeWindow.location.href='+unsafeWindow.location.href);

	// metadata found, check for script update
	if (unsafeWindow.location.href.match(ZWPD.meta)) {
		updaterStart(ZWPD,document.getElementsByTagName('body')[0].innerHTML);
		return;
	}

	storageInit();
	updaterInit();

	ZWPDcreateRunButton();
	if (autorun == true) {
		debugMsg('autorun enabled');
		ZWPDprocess();
	}
}

document.addEventListener('DOMContentLoaded', ZWPDstart(), false);
}())

