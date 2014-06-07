// ==UserScript==
// @name          Autologin Meebo Modified
// @author        Richard Bronosky
// @namespace     http://bronosky.com/pub/greasemonkey_scripts/autologinmeebo.user.js
// @description   Automatically completes all U & P fields and optionally submits login form
// @include       http://www*.meebo.com/
// @include       https://www*.meebo.com/
// ==/UserScript==

// --This script originally written by--
// @author        Tyler Charlesworth
// @namespace     http://www.tyworks.net
// --

(function(){
	//Put your information in below
	//Keep in mind that it will be visible to anybody that uses your computer
	var aimID      = "";
	var aimPwd     = "";
	var msnID      = "";
	var msnPwd     = "";
	var jabID      = "";
	var jabPwd     = "";
	var yahID      = "";
	var yahPwd     = "";
	var meeboID    = "";
	var meeboPwd   = "";
	var autoSubmit = true;
	
	//Don't edit below here
	document.getElementById('aim').value            = aimID;
	document.getElementById('aimpassword').value    = aimPwd;
	document.getElementById('yahoo').value          = yahID;
	document.getElementById('yahoopassword').value  = yahPwd;
	document.getElementById('msn').value            = msnID;
	document.getElementById('msnpassword').value    = msnPwd;
	document.getElementById('jabber').value         = jabID;
	document.getElementById('jabberpassword').value = jabPwd;
	document.getElementById('meebo').value          = meeboID;
	document.getElementById('meebopassword').value  = meeboPwd;

	if(autoSubmit) window.setTimeout("gLogon.loginUser();", 1000);
})();

