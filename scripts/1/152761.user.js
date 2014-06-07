// ==UserScript==
// @name        wykop.pl - pokazywarka zakopo- i wykopowiczów
// @namespace   userscripts.org/script/152761
// @description Skrypt pokazuje przy komentarzach czy ktoś zakopał / wykopał dane znalezisko. Oryginalny skrypt autorstwa użytk. `owczareknietrzymryjski`: http://userscripts.org/scripts/show/140524
// @author      Kulmegil
// @contributor owczareknietrzymryjski [http://userscripts.org/users/429643]
// @version     0.5
// @updateURL   https://userscripts.org/scripts/source/152761.meta.js
// @include     http://*.wykop.pl/link/*
// @include     http://*.wykop.pl/i/link/*
// @run-at      document-start
// 
// DEBUG:
// (GM & Firebug console compatible API required for debugging!)
// //resource    debugDugLiteResponse    debug_dug_lite.html
// //resource    debugBuriedLiteResponse debug_buried_lite.html
// ==/UserScript==

var win = unsafeWindow || window, DBG = false, DBG_TIMES = false, DBG_FAKE_RESPONSE = false;

// maps bury reasons to ids and vice versa
var MAP_BURY_REASONS = {'duplikat': 1, 'spam': 2, 'informacja nieprawdziwa': 3, 'treść nieodpowiednia': 4, 'nie nadaje się': 5,
	'1': 'duplikat', '2': 'spam', '3': 'informacja nieprawdziwa', '4': 'treść nieodpowiednia', '5': 'nie nadaje się'}

/**
 * Using Wykop mobile response (/i/link/wykopali/$id).
 */
function onDugLiteXHRLoad(e) {
	DBG_TIMES && win.console.time('onDugLiteXHRLoad');
	var html = e.target.response, pos = -1, nick = '', reson = '', count = 0;
	
	// grab container: div.userlist
	if ((pos = html.indexOf('<div class="user-list">')) == -1) {return;} else {pos += 23;}
	html = html.substring(pos, html.indexOf('</div>', pos));
	pos = 0;
	
	while (true) {
		// grab nick from (end loop if missing): span
		pos = html.indexOf('<span', pos);
		if (pos == -1) {break}
		pos = html.indexOf('>', pos+5)+1;
		nick = html.substring(pos, (pos = html.indexOf('</span>', pos)));
		pos += 7;
		nick = nick.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim()
		
		voted[nick] = "wykopał";
		count++;
	}
	DBG_TIMES && win.console.timeEnd('onDugLiteXHRLoad', undefined, '123');
	DBG && win.console.info('onDugLiteXHRLoad: count=', count);
	checkReady();
}

/**
 * Using Wykop mobile(old) response (/m/link/zakopali/$id).
 * New mobile version doesn't show bury reasons.
 */
function onBuriedLiteXHRLoad(e) {
	DBG_TIMES && win.console.time('onBuriedLiteXHRLoad');
	var html = e.target.response, pos = -1, nick = '', reson = '', count = 0, byReason = buryStats.byReason;

	// grab container: table[summary="Statystyki zakopów"] > tbody
	pos = html.indexOf('<table width="100%" cellspacing="0" cellpadding="0" summary="Statystyki zakopów"');
	if (pos == -1) {return;} else {pos += 80;}
	pos = html.indexOf('<tbody>', pos)+7;
	html = html.substring(pos, html.indexOf('</tbody>', pos));
	pos = 0;

	while (true) {
		// row container (end loop if missing): tr
		pos = html.indexOf('<tr>', pos);
		if (pos == -1) {break} else {pos += 4}
		
		// grab nick: td:first-child > b
		pos = html.indexOf('>', html.indexOf('<b', pos)+2)+1;
		nick = html.substring(pos, (pos = html.indexOf('<', pos)));
		pos += 1;
		
		// grab reason: td:nth-child(2)
		pos = html.indexOf('<td>', pos)+4;
		//reason = MAP_BURY_REASONS[html.substring(pos, html.indexOf('</td>', pos))];
		reason = html.substring(pos, html.indexOf('</td>', pos));
		pos += 5;
		
		voted[nick] = reason;
		byReason.hasOwnProperty(reason)? (byReason[reason]++) : (byReason[reason] = 1);	
		count++;
	}
	sortBuryStats();
	DBG_TIMES && win.console.timeEnd('onBuriedLiteXHRLoad');
	DBG && win.console.info('onBuriedLiteXHRLoad: count=', count);
	checkReady();
}

function onReady() {
	DBG_TIMES && win.console.time('onReady');
	writeVotesToComments();
	writeBuryStats();
	writeBuryStats2();
	DBG_TIMES && win.console.timeEnd('onReady');
}

/**
 * Helper function. Sorts bury stats by count (desc).
 */
function sortBuryStats() {
	var reason, i, byVotes = [], byReason = buryStats.byReason;
	for (reason in byReason) {
		for (i=0; i<byVotes.length; i++) {
			if (byReason[byVotes[i]] < byReason[reason]) {
				byVotes.splice(i,0,reason);
				break;
			}
		}
		if (i == byVotes.length) byVotes.push(reason);
	}
	buryStats.byVotes = byVotes;
}

/**
 * Adds bury reason stats (sorted) into description.
 */
function writeBuryStats() {
	var html = [], el = document.querySelector('.content header ~ * a.showBury');
	if (!el) return;
	
	var newEl = document.createElement('span');
	//newEl.setAtribute('href', '#justCommenting');
	newEl.className = 'c555';
	newEl.textContent = buryStats.abstainCount;
	// insert before next slibling which is a text node
	el.parentNode.insertBefore(newEl, el.nextSibling); 
	newEl = document.createTextNode(", niezdecydowani ");
	el.parentNode.insertBefore(newEl, el.nextSibling);
	
	el = el.parentNode;
	for (var reason, i=0; i<buryStats.byVotes.length; i++) {
		reason = buryStats.byVotes[i];
		html.push(reason+' <a class="showBury" href="#votersBury">'+buryStats.byReason[reason]+'</a>');
	}
	var newEl = document.createElement('p');
	newEl.innerHTML = '('+html.join(', ')+')';
	el.parentNode.insertBefore(newEl, el.nextElementSibling); //insertAfter
}

/**
 * Adds bury reason stats into "burybox" (when available).
 */
function writeBuryStats2() {
	var elems = document.querySelectorAll('.jbury li[data-reason]'), byReason = buryStats.byReason;
	
	for(var el, newEl, reason, i=0; i<elems.length; i++) {
		el = elems[i];
		reason = MAP_BURY_REASONS[el.getAttribute('data-reason')];
		if (byReason.hasOwnProperty(reason)) {
			var newEl = document.createElement('i');
			newEl.className = 'cff5917 x-small fright';
			newEl.textContent = byReason[reason];
			el.firstChild.appendChild(newEl);
		}
	}
	if (el) {
		el.parentNode.style.width = '170px';
	}
}

/**
 * Adds buried/dug status to comments headers.
 */
function writeVotesToComments() {
	var i, el, newEl, nick, abstainCount=0, 
		elems = document.querySelectorAll('#comments-list-entry > .comment header > a:first-child > *');

	for(i=0; i<elems.length; i++) {
		el = elems[i];
		nick = el.textContent;
		isBury = voted[nick] !== "wykopał";
		
		if (voted.hasOwnProperty(nick)) {
			newEl = document.createElement('span');
			newEl.textContent = voted[nick];
			newEl.className = 'voted';
			newEl.setAttribute('style', 'padding-left: 5px; color: '+(isBury? '#BB0000': '#2A7017')); //'font-weight: bold;
			el = el.parentNode.nextElementSibling.nextElementSibling;
			el.parentNode.insertBefore(newEl, el);
		} else abstainCount++
	}
	buryStats.abstainCount = abstainCount;
	DBG && win.console.info('nie zagłosowało', abstainCount);
}

/**
 * Checks all conditions to start page processing
 */
function checkReady() {
	var isReady = (domContentLoaded && (xhrDug.readyState == xhrDug.DONE && xhrBuried.readyState == xhrBuried.DONE) || DBG_FAKE_RESPONSE);
	DBG && win.console.info('checkReady', isReady);
	if (isReady) {
		onReady();
	}
}

var voted = {}, buryStats = {byReason: {}}, domContentLoaded = (document.readyState == 'complete'),
	xhrDug = new XMLHttpRequest(), xhrBuried = new XMLHttpRequest();

function main() {
	var www_base = document.location.protocol+'//'+document.location.host,
		id = /link\/(\D+\/)?(\d*)\//.exec(document.location.pathname)[2];

	if (!domContentLoaded) {
		document.addEventListener('DOMContentLoaded', function() {domContentLoaded=true;checkReady();}, false);
	} else checkReady();

	if (DBG_FAKE_RESPONSE && GM_getResourceText) {
		setTimeout(function(){
			var ev1 = {target: {response: GM_getResourceText('debugDugLiteResponse')}};
				ev2 = {target: {response: GM_getResourceText('debugBuriedLiteResponse')}};
			onDugLiteXHRLoad(ev1);
			onBuriedLiteXHRLoad(ev2);
		}, 300);
	} else {
		xhrDug.onload = onDugLiteXHRLoad;
		xhrDug.open("GET", www_base+'/i/link/wykopali/'+id, true);
		xhrDug.send();
	
		xhrBuried.onload = onBuriedLiteXHRLoad;
		xhrBuried.open("GET", www_base+'/m/link/zakopali/'+id, true); 
		xhrBuried.send();
	}
}

main();