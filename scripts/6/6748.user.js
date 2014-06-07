// ==UserScript==
// @name          Autologin Meebo - saves username in about:config
// @author        Parashuram
// @namespace     http://autologinmeebo.user.js
// @description   Automatically completes all U & P fields and optionally submits login form
// @include       http://www*.meebo.com/*
// @include       https://www*.meebo.com/*
// ==/UserScript==

// Used scripts by , and thankx to..
// Tyler Charlesworth  : http://userscripts.org/scripts/show/2298
// Richard Bronosky    : http://userscripts.org/scripts/show/4377
// Mark Aufflick
//{89f59f9e-a67a-4522-98b7-dcc2f2c0e2af}

(function()
{
	var autoSubmit = true;
	
	// GETTING THE USER NAME FROM Repository
	if (!GM_getValue('meeboUserName')) 
	{
		meeboUserName = prompt("What is your Meebo user name ?? ");
		GM_setValue('meeboUserName', meeboUserName);
	} 
	else 
	{
		meeboUserName = GM_getValue('meeboUserName');
	}
	
	
	// Getting the password from about:config
	if (!GM_getValue('meeboPassword')) 
	{
		meeboPassword = prompt("What is your Meebo password ?? ");
		GM_setValue('meeboPassword', meeboPassword);
	} 
	else 
	{
		meeboPassword = GM_getValue('meeboPassword');
	}
	
	var userName = document.getElementById('meeboid');
	if (userName != null)
	{
		userName.value = meeboUserName;
	}
	
	var pwd = document.getElementById('meebopassword');
	if (pwd != null)
	{
		pwd.value = meeboPassword;
	}
	
	if(autoSubmit) 
	{
		window.setTimeout("gFrontPage.loginUser();", 1000);
	}
})();
