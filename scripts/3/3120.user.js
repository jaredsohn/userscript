// ==UserScript==
// @name           Ping Pong autologin and redirect to activity
// @namespace      http://henrik.nyh.se
// @description    Autologins to Ping Pong and redirects to the requested activity, as necessary. Point a bookmark to (or simply visit) e.g. https://pingpong.uu.se/servlets/Init/1234, where “1234” is the ID of an activity. You can get this URL by opening the activity manually. The script assumes Firefox has saved your login details and that you want the main window in a tab, not a pop-up. If your login details are not saved, they will typically be when you first log in manually. PLEASE NOTE that if you open two activities in parallell, only the last one will work - this is a Ping Pong issue, not a problem with the script.
// @include        https://akka-auth.uu.se/cas/login*
// @include        https://pingpong.uu.se/
// ==/UserScript==

if (m = /^https:\/\/akka.*?URL=(.+)$/.exec(document.referrer)) {

	// If there is an encoded URL in the refer(r)er, go there

	location.replace(unescape(m[1]));

} else {

	// Autologin

	// Locate form elements
	var form = document.forms.namedItem('login_form');
	if (!form) return;
	var username = form.elements.namedItem('username');
	var password = form.elements.namedItem('password');
	
	var may_submit = true;
	
	// Don't submit form if we are typing into it
	
	do_not_submit = function() {
		may_submit = false;
	}

	username.addEventListener('keydown', do_not_submit, true);
	password.addEventListener('keydown', do_not_submit, true);
	
	function doSignIn() {
		if(may_submit && username.value.length && password.value.length)  // Form must be non-empty and not being typed into
			form.submit();
		else  // Bide our time...
			window.setTimeout(doSignIn, 1000);
	}
	
	// Attempt to sign in
	doSignIn();

}
