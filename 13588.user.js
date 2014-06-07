// LiveTopics user script
// version 0.2 BETA!
// 2007-11-03
// Copyright (c) 2007, Rafael Jannone
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "LiveTopics", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           LiveTopics
// @namespace      http://jannone.org/firefox/
// @description    Atualiza a listagem de topicos em tempo real
// @include        http://www.orkut.com/Community.aspx?cmm=*
// ==/UserScript==

// topic cache, key is the topic id ("tid"), value is the topic info digest
var ltCache = {};

// initialize extension
function ltInit() {
	// create cache
	var trs = document.forms[1].getElementsByTagName('tr');
	// starts at 1 (excluding header's tr)
	for (var i=1; i<trs.length; i++) {
		var key = ltGetKey(trs[i]);
		var hash = ltDigest(trs[i]);
		ltCache[key] = hash;
		ltReformatLink(trs[i]);
	}
	// set polling interval for updates (15 seconds)
	setInterval(ltUpdate, 1000 * 15);
}

// returns a key using the topic's tid
function ltGetKey(tr) {
	var m = /tid=([^&]+)/.exec(tr.cells[0].getElementsByTagName('a')[0].href);
	return m[1];
}

// returns a value using the topic information (number of posts and last change date)
function ltDigest(tr) {
	return [tr.cells[1].innerHTML, tr.cells[2].innerHTML].join('\t');	
}

// sends an ajax request to update topic listing
function ltUpdate() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: document.location.href,
		onload: ltRecv
	});
}

// receives the ajax updates
function ltRecv(resp) {
	// slap the HTML response into a temporary element
	var txt = resp.responseText;
	var tmp = document.createElement('div');
	tmp.innerHTML = txt;
	
	// get the topicForm, where the topic lines are located
	var frms = tmp.getElementsByTagName('form');
	if (!frms) {
		// sanity check
		return;
	}
	var topicsForm = frms[1]; // hardcoded for speed
	if (!topicsForm || topicsForm.name != 'topicsForm') {
		// sanity check
		return;
	}
	
	// set the new topic lines
	document.forms[1].innerHTML = topicsForm.innerHTML;

	// compare with cache and show changes 
	var trs = document.forms[1].getElementsByTagName('tr');
	// starts at 1 (excluding header's tr)
	for (var i=1; i<trs.length; i++) {
		var key = ltGetKey(trs[i]);
		var hash = ltDigest(trs[i]);
		if (!ltCache[key] || ltCache[key] != hash) {
			var span = document.createElement('span');
			span.innerHTML = "<small>[!]</small>";
			span.style.color = "red";
			trs[i].cells[0].appendChild(span);
		}
		ltReformatLink(trs[i]);
	}	
}

// reformat a TR's link so that clicking a topic will go directly to the newer post
function ltReformatLink(tr) {
	var anc = tr.cells[0].getElementsByTagName('a')[0];
	if (!anc)
		return;
	var num = parseInt(tr.cells[1].innerHTML.replace('.', ''), 10);
	num -= 9;
	if (num > 0)
		anc.href = anc.href.replace('start=1', 'na=2&nst=' + num + '#footer');
	anc.addEventListener('click', ltRemoveWarning, false);
}

// remove the warning sign from a topic and reset the cache for that topic
function ltRemoveWarning(ev) {
	var anc = ev.target;
	var parent = anc.parentNode;
	var spans = parent.getElementsByTagName('span');
	for (var i=0; i<spans.length; i++) {
		parent.removeChild(spans[i]);
	}
	var tr = anc;
	while (tr && tr.tagName != 'TR')
		tr = tr.parentNode;
	if (tr) {
		var key = ltGetKey(tr);
		var hash = ltDigest(tr);
		ltCache[key] = hash;
	}
}

// bootstrap
ltInit();

