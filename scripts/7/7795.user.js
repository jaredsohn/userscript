// ==UserScript==
// @name           CSI auto login
// @namespace      http://mandiberg.com
// @description    Automatically logs in to College of Staten Island mail
// @version        0.1
// @date           2007-03-04
// @creator        Michael Mandiberg (Michael [at] Mandiberg [dot] com)
// @include        http://mail.csi.cuny.edu/*
// @include        http://*.mail.csi.cuny.edu/*
// ==/UserScript==
// based on Henrik Nyh's eBay autologin -- http://userscripts.org/scripts/show/1766

//two regular expressions, we will test the path w/ these
const inboxRegex = /\bmenu\.\d*\.cgi\b/g;
const loginRegex = /\blogin\.cgi\b/g;

// the <title>title</title>, some (crappy) pages do not have this
var title = document.getElementsByTagName('title')[0].textContent;
// so we need the path, everything after the root /
var path = window.location.pathname;

// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;
var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// figure out which page we are on based on titles and tests of the path
if (title == 'WebMail Login'){
	// Locate form elements
	var form = document.forms.namedItem('logon');
	var uid = form.elements.namedItem('userid');
	var pw = form.elements.namedItem('passwd');
} else if (loginRegex.test(path)){
	//alert('logon');
	window.location=document.links[0].href
} else if (inboxRegex.test(path)){
	//alert('inbox');
	window.location=document.links[6].href
}

// Don't submit form as we are typing into it
pw.addEventListener('keydown', function(e) {
	maySubmit = false;
	
	clearTimeout(timo);
	
	timo = setTimeout(function() {
		maySubmit = true;
		doSignIn();
	}, 2000);
	
}, true);

function doSignIn() {
	if(uid.value.length && pw.value.length) {  // Form must be non-empty and not being typed into
		form.submit();
	} else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
doSignIn();
