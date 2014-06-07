// ==UserScript==
// @name           Lockerz Auto Login (Dx Edition)
// @namespace      Dxball
// @version        0.2.0
// @description    Auto login lockerz
// @include        http*://www.lockerz.com/
// @include        http*://www.lockerz.com/myLocker
// ==/UserScript==

// ------------ Login Details ------------
var email = GM_getValue("email");
var pass = GM_getValue("pass");
GM_registerMenuCommand("Lockerz Auto Login > Set Email", function(){email = prompt("Input your Email", email); GM_setValue("email", email); });
GM_registerMenuCommand("Lockerz Auto Login > Set Password", function(){pass = prompt("Input your Password"); GM_setValue("pass", pass); });
GM_registerMenuCommand("Lockerz Auto Login > Clean data", function(){email = undefined; pass = undefined; GM_deleteValue("email"); GM_deleteValue("pass"); });
if (document.getElementById("login-main")){
//if (document.body.innerHTML.indexOf("Remember me") > -1) {
	if(!email){ email = prompt("Input your Email"); GM_setValue("email", email);}
	if(!pass){ pass = prompt("Input your Password"); GM_setValue("pass", pass);}

	// Function to return the Element by ID. Makes code shorter.
	function $$(a) {
		return document.getElementById(a);
	}

	// If its the login page then login.
	$$("email-email").value = email;
	with(p = $$("password-password")) focus(), value = pass;
	if(email && pass){
		$$("sumbitLogin").click();
	}
}