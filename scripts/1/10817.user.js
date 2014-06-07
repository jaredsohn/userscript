// ==UserScript==
// @name           Vanguard Auto-Login v1.2
// @description    This script will allow you to automatically login to your investor account at Vanguard.
// @include        https://personal.vanguard.com/*
// ==/UserScript==
//Read and follow the instructions to the end of the 
//configuration section.  
//Script date 2007-12-28
//IT IS VERY RISKY TO AUTOMATICALLY LOGIN TO ANY FINANCIAL SITE!
//USE OF THIS SCRIPT IS AT YOUR OWN RISK!

/***Configuration***/

/* Delete this line for automatic entering of your User Name
//USE THIS AT YOUR OWN RISK!  YOUR USER NAME WILL BE STORED IN CLEAR TEXT!
//Enter your User Name between the "" below
var UserName = ""; /* */

/* Delete this line for automatic entering of your password
//USE THIS AT YOUR OWN RISK!  YOUR PASSWORD WILL BE STORED IN CLEAR TEXT!
//Enter your Password between the "" below
var Password = ""; /* */ 

/* Delete this line if you wish to Autologin.
//This will cause the submit buttons to be "clicked" for you automatically.
//USE THIS AT YOUR OWN RISK!
function AutoLogin()
{
	form.submit();
} /* */ 

/***End Configuration***/

//For User Name
//If PMLogin is in the location that it is the password page.
var mySearch = /PMLogin/;
var loc = window.location.href;
var PassOrNot = loc.search(mySearch);
if(PassOrNot == -1)
{
	if (typeof(UserName)!='undefined')
	{
		//They have different login forms, depending on which page you are on.
		try
		{
			var form = document.forms.namedItem("LoginForm");
			var input = form.elements.namedItem("USER");
			input.value = UserName;
			if (typeof(AutoLogin)!='undefined')
				AutoLogin();
		}
		catch(e)
		{
		}
		try
		{
			var form = document.forms.namedItem("LoginForm");
			var input = form.elements.namedItem("USER");
			input.value = UserName;
			if (typeof(AutoLogin)!='undefined')
				AutoLogin();
		}
		catch(e)
		{
		}
	}
}
else
//For Password
{
	if (typeof(Password)!='undefined')
	{
		try
		{
			var form = document.forms.namedItem("LoginForm");
			var input = form.elements.namedItem("PASSWORD");
			input.value = Password;
			if (typeof(AutoLogin)!='undefined')
				AutoLogin();
		}
		catch(e)
		{
		}
	}
}
