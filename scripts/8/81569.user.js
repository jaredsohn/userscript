// ==UserScript==
// @name           Ikariam AutoLogin
// @namespace      Ikariam AutoLogin
// @description    Automatically login into your Ikariam account.
// @include        http://*ikariam.com/*
// @author			   cellax
// @version			   0.1
// ==/UserScript==

//------------------------ Config -------------------------------------------
var server = "";  	// the number of your server ... 0 for Alpha, 1 for beta, 2 for Gamma, 5 for Zeta etc ...
var login = "";		// your account login
var password = "";	// your account password

if(document.getElementById('loginForm')) {
	document.getElementById('logServer').selectedIndex = server;
	document.getElementById('loginName').value = login;
	document.getElementById('loginPassword').value = password;
	if(login != "" && password != "") {
		var url = "http://" + document.getElementById('logServer').value + "/index.php?action=loginAvatar&function=login";
		document.getElementById('loginForm').action = url; 
		document.getElementById('loginForm').submit();
	}	   
}