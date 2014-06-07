// ==UserScript==
// @name           Barrapunto Auto Login
// @namespace      Jefry Lagrange
// @version        0.0.1
// @description    Auto login Barrapunto
// @include       http*://barrapunto.com/
// @include       http*://barrapunto.com/journal.pl?op=top
// @include       http*://*barrapunto.com
// ==/UserScript==

// ------------ Login Details ------------
var nickname = GM_getValue("nickname");
var pass = GM_getValue("pass");

GM_registerMenuCommand("Barrapunto Auto Login > Set Nickname", function(){nickname = prompt("Input your Nickname"); GM_setValue("nickname", nickname); });
GM_registerMenuCommand("Barrapunto Auto Login > Set Password", function(){pass = prompt("Input your Password"); GM_setValue("pass", pass); });
GM_registerMenuCommand("Barrapunto Auto Login > Clean data", function(){nickname = undefined; pass = undefined; GM_deleteValue("nickname"); GM_deleteValue("pass"); });
if (document.getElementById("login-content")){
	if(!nickname){ nickname = prompt("Input your Nickname"); GM_setValue("nickname", nickname);}
	if(!pass){ pass = prompt("Input your Password"); GM_setValue("pass", pass);}

	// Function to return the Element by ID. Makes code shorter.
	function $$(a) {
		return document.getElementsByName(a)[0];
	}

	// If its the login page then login.
	$$("unickname").value = nickname;
	with(p = $$("upasswd")) focus(), value = pass;
	if(nickname && pass){
		$$("userlogin").click();
	}
}
