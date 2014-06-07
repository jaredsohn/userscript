// ==UserScript==
// @name Decrud buffalo.edu
// @description Makes UB's website less annoying v1.0
// @include http://*.buffalo.edu/*
// @include https://*.buffalo.edu/*

var epochst = 'Thu, 01-Jan-1970 00:00:01 GMT';

function kill_cookie(name, path, domain) {
	while(name[0] == ' ') {
		name = name.substr(1);
	}
	
	
	var l = name + '=foo;';
	l += 'expires=' + epochst;
	
	if(path != undefined) {
		l += ';path=' + path;
	}
	
	if(domain != undefined) {
		l += ';domain=' + document.domain;
	}
	
	document.cookie = l;
}

function kill_all_cookies(path, domain) {
	var cookies = document.cookie.split(';');
	for(var i = 0; i < cookies.length; ++i) {
		var x = cookies[i].split('=', 1);
		var name = x[0];
		kill_cookie(name, path, domain);
	}
}

// wantLogout is a little state machine we use to visit all the various
// shibboleth subdomains -- we need to clear cookies at each one.
var wantLogout = GM_getValue('wantLogout', 0);

if(wantLogout == 1) {
	kill_all_cookies('/');
	GM_setValue('wantLogout', 2);
	window.location = 'https://webiso.buffalo.edu';
} else if(wantLogout == 2) {
	kill_all_cookies('/');
	GM_setValue('wantLogout', 0);
	window.location = 'https://myub.buffalo.edu';
}

// Make Firefox ignore buffalo.edu's request
// not to save passwords. Viva la user.
var x = document.evaluate(
	'//*[@autocomplete="off"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < x.snapshotLength; ++i) {
	var thing = x.snapshotItem(i);
	thing.removeAttribute('autocomplete');
}

// Make the "Logout" button on MyUB actually
// log you out. We do this by forcibly removing
// UB's session cookies. Since UB uses three domains
// for storing these things, we do a little song and dance
// to remove them all.
function shib_logout(e) {
	e.preventDefault();
	kill_all_cookies('/');
	GM_setValue('wantLogout', 1);
	window.location = 'https://shibboleth.buffalo.edu/shibboleth/foo.html';
}

// Change "Logout" button on MyUB to do a real logout iff we're
// on myub.buffalo.edu; I don't want to screw around with other buffalo.edu
// sites that happen to use a link called "Logout"
if(document.domain == 'myub.buffalo.edu') {
	var logout_links = document.evaluate(
		'//A[translate(text(),"LOGOUT","logout")="logout"]',
		document,
			null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for(var i = 0; i < logout_links.snapshotLength; ++i) {
		var item = logout_links.snapshotItem(i);
		item.addEventListener('click', shib_logout, false);
	}
}
