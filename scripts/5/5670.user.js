// ==UserScript==
// @name		StudiVZ/SchuelerVZ/MeinVZ Autologin
// @namespace	http://www.studivz.net/profile.php?ids=ngcgVg
// @description	Automatically logs into StudiVZ as long as Firefox is set to remember (and autofill) your log-in details. Based on myebayautologin. Also check out StudiVZ Announceblocker.
// @include	http://www.studivz.net/*
// @include	http://www.schuelervz.net/*
// @include	http://www.meinvz.net/*
// @include	http://www.studivz.de/*
// @include	http://www.schuelervz.de/*
// @include	http://www.meinvz.de/*
// @exclude	http://www.studivz.net/*logout*
// @exclude	http://www.schueler.net/*logout*
// @exclude	http://www.studivz.net/*logout*
// @exclude	http://www.studivz.de/*logout*
// @exclude	http://www.schueler.de/*logout*
// @exclude	http://www.studivz.de/*logout*
// ==/UserScript==

// Written by Philipp Krueger - check out http://www.studivz.net/profile.php?ids=ngcgVg I gather if you're using this, you have an account. :)


// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;

var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Don't submit form as we are typing into it
if(document.getElementById('Login_password')!=null){
	document.getElementById('Login_password').addEventListener('keydown', function(e) {
		maySubmit=false;
		clearTimeout(timo);
		timo=setTimeout(function() {
			maySubmit=true;
			doSignIn();
		}, 2000);
	}, true);
}

function doSignIn(){
	if((document.getElementById('Login_email').value.length > 0)&&(document.getElementById('Login_password').value.length > 0)&&(maySubmit==true)) {
		document.getElementsByName('login')[0].type = 'hidden';
		document.getElementById('jsEnabled').value=true;
		document.forms[0].submit();
	}
	else{
		window.setTimeout(doSignIn, timer);
	}
}

// Attempt to sign in
if(document.getElementById('Login_password')!=null){
	doSignIn();
}