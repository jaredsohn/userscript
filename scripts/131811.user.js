// ==UserScript==
// @name                auto login in irctc
// @description 	Auto login in irctc
// @namespace   	AMR
// @include             https://*irctc.co.in/*
// @version     	1.0
// @license     	GPL v3 or later version; http://www.gnu.org/licenses/gpl.html
// @author           THIS SCRIPT IS CORRECT
// ==/UserScript==


//For login
var username = "";	//Enter your username between the double quotes (Leave blank if you do not want to auto login)
var password = "";	//Enter your password between the double quotes (Leave blank if you do not want to auto login)


// ------------------------- DO NOT EDIT ANYTHING BELOW THIS LINE -------------------------

function AMR()
{
	//check if at login page
	if(location.href.match("https://www.irctc.co.in"))
	{
		if(username!="" && password !="")
		{
			document.getElementsByName('userName')[0].value = username;
			document.getElementsByName('password')[0].value = password;
			var input = document.getElementsByTagName('input');
			input[input.length-1].click();
		}
	}
	
	//check if at the page exactly after login
	else if(location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/login.do/) || location.href.match(/^https:\/\/www.irctc.co.in\/cgi-bin\/soft.dll\/irctc\/page\/homePage.jsp/))
	