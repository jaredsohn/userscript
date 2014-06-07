// Copyright (c) 2011 Owen Barton
// Released under the GPLv3 license.
// ==UserScript==
// @name          Trac autologin for basic auth
// @namespace     grugnog@yahoo.com
// @description   Logs you in automatically to Trac: clicks the log-in link. You may want to use https://addons.mozilla.org/en-US/firefox/addon/autoauth/ to submit the basic auth popup. Inspired by http://userscripts.org/scripts/review/10456.
// @include       http://trac.*
// @include       https://trac.*
// ==/UserScript==

// Bail early unless it's a Trac page.
if (!$('tracpowered')) return;

// Redirect to the stored snapback page if we were just automatically logged in
const SNAPBACK_COOKIE = 'GM_snapback';
var redirectTo = readCookie(SNAPBACK_COOKIE) || location.href;
if (redirectTo !== location.href) {
  eraseCookie(SNAPBACK_COOKIE);
  location.replace(redirectTo);
}

// Send to log-in page if there's a log-in link
var login = $xs('id("metanav")//a[.="Login"]');
if (login) {
  createCookie(SNAPBACK_COOKIE, location.href);
  location.href = login.href;
}

// Xpath helpers
function $(id) { return document.getElementById(id); }
function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
function $xs(path, root) { var arr = $x(path, root); return arr ? arr[0] : null; }

// http://www.quirksmode.org/js/cookies.html
function createCookie(name,value) {
	document.cookie = name+"="+value+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
