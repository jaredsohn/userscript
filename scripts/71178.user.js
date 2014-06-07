// MyEUR auto-login script
// version 1.0
// 11-03-2010
// Copyright (c) 2010, Milan Jansen (310504mj)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          MyEUR auto-login
// @description   Script to automatically log on to MyEUR.nl. Make sure to enter your password correctly the first time you run this script.
// @include       http://*.eur.nl/amserver/*
// ==/UserScript==

if(GM_getValue("EURpass")) // if password is already set, automatically login
{
	document.getElementsByName("IDToken2")[0].value = GM_getValue("EURpass"); // set password field
	location.assign("javascript:LoginSubmit('Log-in')"); // "click" login button
}

else // if the password is not yet set
{
	var button = document.createElement("a"); // create an anchor element
	button.innerHTML = "Remember password"; // make it say "Remember password" 
	button.className = "button-link"; // give it a button look
	button.href="#"; // without this, the cursor doesn't change appropiately when you hover over the link
	button.addEventListener('click', function (e) // add an event listener that detects clicks
	{
		GM_setValue("EURpass", document.getElementsByName("IDToken2")[0].value); // store password from password field
		location.assign("javascript:LoginSubmit('Log-in')"); // "click" login button
	}
	, false);

	document.getElementsByTagName("a")[4].parentNode.appendChild(button); // add button to page
}