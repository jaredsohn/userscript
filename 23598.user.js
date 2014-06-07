// Password Strength user script
// version 0.1 BETA!
// 2008-03-06
// Copyright (c) 2008, Raanan Avidor
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Password Strength", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Password Strength
// @namespace     http://raanan.avidor.org/download/
// @description   Check the password strength on every password field in a form when filled
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==
var PasswordStrength =
{
	psswrdScore: 0,
	init: function()
	{
		var inputFields = document.getElementsByTagName("input");
		for (var i = 0; i < inputFields.length; i++)
		{
			if (inputFields[i].getAttribute("type") == "password")
			{
				inputFields[i].addEventListener("keyup", PasswordStrength.changeListener, false);
			}
		}
	},

	testStrength: function(psswrd)
	{
		psswrdScore = 0;
		if (psswrd.length == 0)
		{
			psswrdScore = 0;
		}
		else if (psswrd.length > 0 && psswrd.length < 5)
		{
			psswrdScore = psswrdScore + 3;
		}
		else if (psswrd.length > 4 && psswrd.length < 8)
		{
			psswrdScore = psswrdScore + 6;
		}
		else if(psswrd.length > 7 && psswrd.length < 16)
		{
			psswrdScore = psswrdScore + 12;
		}
		else if(psswrd > 15)
		{
			psswrdScore = psswrdScore + 18;
		}

		if (psswrd.match(/[a-z]/))
		{
			psswrdScore = psswrdScore + 1;
		}
		
		if (psswrd.match(/[A-Z]/))
		{
			psswrdScore = psswrdScore + 5;
		}
		
		if (psswrd.match(/\d+/))
		{
			psswrdScore = psswrdScore + 5;
		}
		
		if (psswrd.match(/(.*[0-9].*[0-9].*[0-9])/))
		{
			psswrdScore = psswrdScore + 5;
		}

		if (psswrd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/))
		{
			psswrdScore = psswrdScore + 5;
		}

		if (psswrd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/))
		{
			psswrdScore = psswrdScore + 5;
		}

		if (psswrd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
		{
			psswrdScore = psswrdScore + 2;
		}

		if (psswrd.match(/([a-zA-Z])/) && psswrd.match(/([0-9])/))
		{
			psswrdScore = psswrdScore + 2;
		}
 
		if (psswrd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/))
		{
			psswrdScore = psswrdScore + 2;
		}
	},
	changePsswrdField : function(element)
	{
		if (psswrdScore == 0)
		{
			element.style.backgroundColor = "";
		}
		else if (psswrdScore < 11)
		{
			element.style.backgroundColor = "#da6540";
		}
		else if (psswrdScore > 10 && psswrdScore < 16)
		{
			element.style.backgroundColor = "#bc8340";
		}
		else if(psswrdScore > 15 && psswrdScore < 21)
		{
			element.style.backgroundColor = "#9ba440";
		}
		else if (psswrdScore > 20 && psswrdScore < 26)
		{
			element.style.backgroundColor = "#7bc440";
		}
		else if (psswrdScore > 25 && psswrdScore < 46)
		{
			element.style.backgroundColor = "#5ee140";
		}
		else if (psswrdScore > 45)
		{
			element.style.backgroundColor = "#48f840";
		}
		else
		{
			element.style.backgroundColor = "";
		}
	},

	changeListener : function(event)
	{
		PasswordStrength.testStrength(this.value);
		PasswordStrength.changePsswrdField(this);
	}
	
};

window.addEventListener("load", PasswordStrength.init, false);