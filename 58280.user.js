// ==UserScript==
// @name          Auckland Uni auto login
// @namespace     http://userscripts.org/scripts/show/58280
// @description   Enter password + login automatically
// @include       https://wireless.auckland.ac.nz/*
// @include	  https://unisign.auckland.ac.nz/cosign.cgi*
// @include	  http*://cecil.auckland.ac.nz/login.asp*
// @include	  http*://cecil.auckland.ac.nz/LogIn.asp*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
(function () {
 	GM_registerMenuCommand("Set Username", function() {
		GM_setValue("username", prompt("Please enter your username/upi"));
		});
	GM_registerMenuCommand("Set Password", function() {
		GM_setValue("password", prompt("Please enter your password (clear text)"));
		});
	if (window.location.href.indexOf("login.aspx") > -1 || window.location.href.indexOf("LogIn.aspx") > -1){
		window.location = ( "http://cecil.auckland.ac.nz/ssoLogin.aspx")
	}
 	var username = GM_getValue("username", "");
	if (username == ""){
		GM_setValue("username", prompt("Please enter your username/upi"));
		username = GM_getValue("username", "");
	}
	var password = GM_getValue("password", "");
	if (password == "") {
		GM_setValue("password", prompt("Please enter your password (clear text)"));
		password = GM_getValue("username", "");
	}
	$("input[name='username']").val(username);
       	$("input[name='login']").val(username);
	$("input[name='password']").val(password);
	$("form[name='f']").submit();
	unsafeWindow.submitAction();
	
}());