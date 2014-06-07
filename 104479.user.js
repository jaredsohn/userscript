// ==UserScript==
// @name          UDC Better Login
// @namespace     http://youngpup.net/userscripts
// @description   Simplifies the login procedure by avoiding the welcome page and the "already logged in" message
// @include       http://www.unitedcats.com/en
// @include       http://www.unitedcats.com/en/
// @include       http://www.uniteddogs.com/en
// @include       http://www.uniteddogs.com/en/
// @include       http://www.unitedcats.com/en/welcome
// @include       http://www.unitedcats.com/en/welcome/
// @include       http://www.unitedcats.com/en/login
// @include       http://www.unitedcats.com/en/login/
// @include       http://www.uniteddogs.com/en/welcome
// @include       http://www.uniteddogs.com/en/welcome/
// @include       http://www.uniteddogs.com/en/login
// @include       http://www.uniteddogs.com/en/login/
// ==/UserScript==

regExp1  = /www.unitedcats.com\/en\/welcome/;
regExp1a = /www.unitedcats.com\/en$/;
regExp1b = /www.unitedcats.com\/en\/$/;
regExp2  = /www.uniteddogs.com\/en\/welcome/;
regExp2a = /www.uniteddogs.com\/en$/;
regExp2b = /www.uniteddogs.com\/en\/$/;
regExp3  = /www.unitedcats.com\/en\/login/;
regExp4  = /www.uniteddogs.com\/en\/login/;
regExp5  = /You are already signed in/;

if (regExp1.test(top.location) || regExp1a.test(top.location) || regExp1b.test(top.location))
{
	top.location = "http://www.unitedcats.com/en/login";
}

else if (regExp2.test(top.location) || regExp2a.test(top.location) || regExp2b.test(top.location))
{
	top.location = "http://www.uniteddogs.com/en/login";
}

else if (regExp3.test(top.location) && regExp5.test(document.getElementById("page").innerHTML))
{
	top.location = "http://www.unitedcats.com/en/home";
}
else if (regExp4.test(top.location) && regExp5.test(document.getElementById("page").innerHTML))
{
	top.location = "http://www.uniteddogs.com/en/home";
}

// end of script