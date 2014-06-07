// ==UserScript==
// @name          save your meebo username and password in about:config
// @author        richard killingsworth
// @namespace     http://www.myspace.com/froggy26rk
// @description   Automatically completes all U & P fields and optionally submits login form
// @include       http://www*.meebo.com/
// @include       http://www*.meebo.com/index*.html
// @include       https://www*.meebo.com/
// @include       https://www*.meebo.com/index*.html
// @include       http://classic.meebo.com/index-en.html
// @include       https://classic.meebo.com/index-en.html
// ==/UserScript==
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
		window.setTimeout("gLogon.loginUser();", 1);
	}
})();
