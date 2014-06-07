// ==UserScript==
// @name          Trac autologin FF
// @namespace     http://henrik.nyh.se
// @description   Logs you in automatically to Trac: sends you to the log-in page and submits the log-in form if Firefox has prepopulated it. Rationale: Tracs easily forget your session, which gets annoying. Assumes an AccountManager-like authorization system as seen on e.g. DevjaVu.com and dev.rubyonrails.com. If you're sent to the log-in page and the form is not populated by Firefox, you'll be sent back. In that case, and if you log out manually, autologin is disabled for the site in question until the browser is restarted or the login page loaded.
// @include       http://*.devjavu.com/*
// @include       http://dev.*
// @include       http://trac.*
// @include       http://*:8000/*
// ==/UserScript==

/*
  TODO:
  + Remember non-accounts beyond the current session; array/hash in GM_value?
*/


// Bail early unless it's a Trac page.
// Most Trac sites have the "Trac Powered" image; the DevjaVu log-in page doesn't.

if (!$('tracpowered') && !location.host.match(/\.devjavu.com$/)) return;


var login = $xs('id("metanav")//a[.="Login"]'), logout = $xs('id("metanav")//a[.="Logout"]');
var form = $xs('//form[@action=""]'), username = $('user'), password = $('password');

const SNAPBACK_HASH   = '#GM_trac_snapback', AUTOLOGIN_HASH = '#GM_trac_autologin',
      SNAPBACK_COOKIE = 'GM_snapback',       DISABLE_COOKIE = 'GM_disable_autologin';

var onLoginPage     = location.href.match(/\/login$/) && !location.href.match('/wiki/');
var onAutoLoginPage = location.href.indexOf(AUTOLOGIN_HASH) != -1;
var doSnapBack      = location.href.indexOf(SNAPBACK_HASH)  != -1;


// Ensure we're not automatically logged in again if we log out manually or failed to autologin.
// Lasts until the browser is restarted or the login page is loaded.

if (onLoginPage)
  eraseCookie(DISABLE_COOKIE);

if (readCookie(DISABLE_COOKIE))
  return;

if (logout)
  logout.addEventListener('click', function() { createCookie(DISABLE_COOKIE, true); }, false);


// Redirect to the stored snapback page if we were just automatically logged in

if (doSnapBack && !login) {

  var redirectTo = readCookie(SNAPBACK_COOKIE) || location.href;
  if (unhash(redirectTo) == unhash(location.href))  // Just empty the hash if we're there already
    location.hash = '#';
  else  // Actually redirect
    location.replace(redirectTo);

}

// Submit form if we're on the login page and were told to autologin

else if (onAutoLoginPage && form && username && password) {
	setTimeout(function(){
	  if (username.value=="" || password.value=="") {
	    // Snap back and don't autologin again for the duration of this session
	    createCookie(DISABLE_COOKIE, true);
	    history.back();
	  } else {
	    // Submit form
	    form.action = SNAPBACK_HASH;
	    form.submit();
	  }
	}, 10);
}

// Send to log-in page if there's a log-in link

else if (login) {

  createCookie(SNAPBACK_COOKIE, location.href);
  location.href = login.href + AUTOLOGIN_HASH;
  
}


function unhash(string) { return string.replace(/#.*$/, ''); }


/* Staple functions */

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