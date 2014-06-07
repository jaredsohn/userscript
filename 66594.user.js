// ==UserScript==
// @name           Ikariam Auto Login
// @namespace      ikariam
// @description    Automatically logs you in to your Ikariam account.
// @include        http://*ikariam.*
// @author			PhasmaExMachina
// @version			0.01
// ==/UserScript==

//------------------------ Config -------------------------------------------
var server = ;  	// the number of your server ... 0 for Alpha, 1 for beta, 2 for Gamma, etc ...
var login = "";		// your account login
var password = "";	// your account password

if(document.getElementById('loginForm')) {
	document.getElementById('universe').selectedIndex = server;
	document.getElementById('login').value = login;
	document.getElementById('pwd').value = password;
	if(login != "" && password != "") {
		var url = "http://" + document.getElementById('universe').value + "/index.php?action=loginAvatar&function=login";
		document.getElementById('loginForm').action = url; 
		document.getElementById('loginForm').submit();
	}	   
}