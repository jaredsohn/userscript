// ==UserScript==
// @name           DesiTorrents Enhancer
// @author         1nfected
// @description    Enhancement suite for desiTorrents.com. Cross-browser compatible!
// @namespace      1nfected
// @version        0.7
// @include        http://www.desitorrents.com/forums*
// @include        https://www.desitorrents.com/forums*
// @include        http://desitorrents.com/forums*
// @include        https://desitorrents.com/forums*
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// ==/UserScript==

(function() {

var show_downloads = false;	// Will remove the view limit in downloads section.
var show_releases = true;	// Will remove the view limit in released section.
var sort = true;			// Will sort forums by thread start date.

var scriptid = 39849;
var version = '0.7';

try { if(self != top) return; }
catch(e) { return; }

function testGM() {
	const prefix = 'DT-';
	const LOG_PREFIX = 'DT Enhancer: ';
	var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? GM_log : window.opera ? function(msg) { opera.postError(LOG_PREFIX+msg); } : function(msg) { try { console.log(LOG_PREFIX+msg); } catch(e) { } }	
	setValue = isGM ? GM_setValue : function(name,value) { switch (typeof(value)) { case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.') < 0) { localStorage.setItem(STORAGE_PREFIX+name,'N]'+value); } break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name,'B]'+value); break; } }
    getValue = isGM ? GM_getValue : function(name,defValue) { var value = unsafeWindow.localStorage.getItem(STORAGE_PREFIX+name); if(value == null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true'; } } return value; }
}
testGM();

var url = window.location.href;

var user = document.getElementsByClassName('memberBox1')[0];
if(user) user = user.getElementsByTagName('a')[0].textContent;
else return;

if(!getValue(user+'-sort')) setValue(user+'-sort',sort);
else sort = getValue(user+'-sort');

// Removing the 15 torrent view limit
var links = document.evaluate('//a[contains(text(),"'+user+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var link, i = links.snapshotLength; link = links.snapshotItem(--i);) {
	if(link.text == user) {
		if(show_downloads) link.href += '?limit=-1';
		if(show_releases) link.href += (show_downloads ? '&' : '?') + 'limit1=-1';
	}
}

// Determine if we are on the member page.
if(url.match(/desitorrents\.com\/forums\/\users/)) {
	var bt = document.getElementById('xbt');
	if(!bt) return; // Not on our own page, so EXIT!
	
	// Check to see if view limits are removed (when user visits his page directly)
	var nurl = url;
	if(url.indexOf('limit=-1') < 0 && show_downloads) nurl += '?limit=-1';
	if(url.indexOf('limit1=-1') < 0 && show_releases) nurl += (show_downloads ? '&' : '?') + 'limit1=-1';
	if(nurl != url) window.location.replace(nurl);
	
	log('Bittorrent tab detected, creating toggle functionality...');
	var tables = bt.getElementsByTagName('table');
	
	for(var i = 0 ; i < tables.length ; i++) {
		var el = tables[i].children[0].children[0].children[0];
		el.style.cursor = 'pointer';
		el.addEventListener('click', function() { toggle(this); }, false);
		if(getValue(user+'-'+el.textContent) == false) toggle(el);
	}	
}

function toggle(element) {
	var table = element.parentNode.parentNode.parentNode;
	var children = table.getElementsByTagName('tbody');
	if(children.length <= 1) return;
	if(children[0].style.display == 'none') {
		element.textContent = element.textContent.replace(/\s-\s\d+\sItems\shidden$/,'');
		log('Showing "'+element.textContent+'" table.');
		setValue(user+'-'+element.textContent, true);
	}
	else {
		setValue(user+'-'+element.textContent, false);
		log('Hiding "'+element.textContent+'" table.');
		element.textContent += ' - '+(children.length-1)+' Items hidden';
	}
	for(var i = 0, len = children.length-1 ; i < len ; i++) {
		var child = children[i];
		if(child.style.display == 'none') child.style.display = '';
		else child.style.display = 'none';
	}
}

// Sort forum threads by start time, if not already sorted. Forums in the general section are not sorted.
if(sort && url.match(/desitorrents\.com\/forums\/\d+-/)	&& url.indexOf('sort=') < 0	&& !url.match(/forums\/(9|10|188|250)-/))
	window.location.replace(url+"?sort=dateline");

// Update Check [Uses PhasmaExMachina's Script Updater]
if(typeof ScriptUpdater == 'object') ScriptUpdater.check(scriptid,version);

})();