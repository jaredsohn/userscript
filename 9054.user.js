/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply - delayed popup miniprofile
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Delay popup miniprofile for .5 sec, to prevent transient mouseovers triggering it
// @version	  0.1
// @include	  http://multiply.com/*
// @include	  http://*.multiply.com/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

if (!unsafeWindow.popup_miniprofile)
    return;

var DEBUG = false;
function debug(msg) {
    if (DEBUG) {
	GM_log('[' + new Date() + '] ' + msg);
    }
}

function $x(p, context) {
    if (!context) context = document;
    var arr = new Array();
    var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; item = xpr.snapshotItem(i); i++) {
	debug(i + ': ' + item.innerHTML);
	arr.push(item);
    }
    return arr;
}

debug(window.location + ': popup_miniprofile found!');

var really_popup_miniprofile = unsafeWindow.popup_miniprofile;
var timer = new Array();

function deferred_popup(el_id, user_id) {
    return function() {
	debug('defered_popup for ' + el_id + '|' + user_id);
	if (timer[el_id] != null)
	    return;
	debug('setting timer[' + el_id + ']');
	timer[el_id] = setTimeout(function() { debug('pop up now ' + el_id + '|' + user_id); really_popup_miniprofile(document.getElementById(el_id).parentNode, user_id, 0, 0); }, 500);
    };
}

function mouse_out(el_id) {
    return function() {
	if (timer[el_id] != null) {
	    debug('clearing timer[' + el_id + ']');
	    clearTimeout(timer[el_id]);
	    timer[el_id] = null;
	    var uid = (el.href.match(/\/\/(.*?)\.multiply/))[1];
	    document.getElementById(el_id).addEventListener('mouseover',
							    function() { deferred_popup(el_id, uid); },
							    false);
	}
    };
}

var headshots = $x('//*[contains(@onmouseover, "popup_miniprofile")]');
debug(headshots.length + ' headshots found.');

for (var i = 0; i < headshots.length; i++) {
    var el = headshots[i];
    if (!el.id)
	el.id = '__headshot__' + i;
    var el_id = el.id;
    var uid = (el.href.match(/\/\/(.*?)\.multiply/))[1];
    debug('el = ' + el_id + '| uid = ' + uid);
    el.setAttribute('onmouseover', null);
    el.addEventListener('mouseover', deferred_popup(el_id, uid), false);
    el.addEventListener('mouseout', mouse_out(el_id), false);
}
