// ==UserScript==
// @name		WKW Autologin
// @namespace	http://userscripts.org/users/11831
// @description	Logs you in to WKW instead of showing superfluous errors
// @include		http://www.wer-kennt-wen.de/*
// @exclude		http://www.wer-kennt-wen.de/index.php?logOut=1
// @exclude		http://www.wer-kennt-wen.de/logout*
// ==/UserScript==

// Written by Philipp Krueger - check out http://www.wer-kennt-wen.de/person/mav9f1jp I gather if you're using this, you have an account. :)

// Milliseconds to wait for form to autofill (slower computers may need longer wait)
var timer = 1000;

var timo, maySubmit = true;  // Not currently typing (so we can submit it)

// Don't submit form as we are typing into it
if(document.getElementById('login')!=null){
	document.getElementById('loginName').addEventListener('keydown', function(e){
		maySubmit=false;
		clearTimeout(timo);
		timo=setTimeout(function(){
			maySubmit = true;
			doSignIn();
		}, 2000);
	}, true);
}

function doSignIn(){
	if((document.getElementById('loginName').value.length>0)&&(document.getElementById('password').value.length>0)&&(maySubmit==true)){
		document.getElementsByName('logIn')[0].value='1';
		document.getElementById('loginform').submit();
	}
	else{
		window.setTimeout(doSignIn(), timer);
	}
}

// Attempt to sign in
if(document.getElementById('login')!=null){
	doSignIn();
}
else{
	if(document.location.href=='http://www.wer-kennt-wen.de/error/rights'){
		window.location.href = "http://www.wer-kennt-wen.de/start";
	}
}