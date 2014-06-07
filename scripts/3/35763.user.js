// RESNET Auto-Login
// version 1.0
// 2007-03-02
// GUID = {aa53092b-b70e-40b2-b62a-0352816dec25}
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Cisco Clean Access Auto-Login", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          UWEResnet Auto-Login
// @description   Automatically log into the UWE Internet. You must save your username and password with firefox.
// @include       https://resnet-bs1.uwe.ac.uk/*
// @exclude       http://*
// ==/UserScript==

// Find all <div> tags
var div = document.getElementsByTagName("div");

// Check if page is OSU logon page by looking for phrase below.
for (var i = 0; i < div.length; i++)
{
	if (div[i].innerHTML == "\n      // OSU RESNET Auto-Login
// version 1.0
// 2007-03-02
// GUID = {aa53092b-b70e-40b2-b62a-0352816dec25}
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Cisco Clean Access Auto-Login", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OSU RESNET Auto-Login
// @description   Automatically log into the UWE RESNET Internet. You must save your username and password with firefox.
// @include       https://resnet-bs1.uwe.ac.uk/*
// @exclude       http://*
// ==/UserScript==

// Find all <div> tags
var div = document.getElementsByTagName("div");

// Check if page is OSU logon page by looking for phrase below.
for (var i = 0; i < div.length; i++)
{
	if (div[i].innerHTML == "Username")
	{
		// Load first form on page
		var form = document.getElementsByTagName("form")[0];
		
		// Check if check box exists because you have logged on too many times.
		if (form.elements[11])
		{
			// Check box
			form.elements[11].checked = true;
		}
		form.submit();
	}
}


// Load all font tags on page.
var font = document.getElementsByTagName("font");

// Check if page is logon success page by finding phrase below.
if (font[0] && font[0].innerHTML == "UWE Residential Network")
{
	// Load <a> tag for page you want to go to.
	var a = document.getElementsByTagName("a")[0];

	// Set target to same window
	a.setAttribute("target","_self");

	// Go to web address
	window.location.href = a.href;
}

\n    ")
	{
		// Load first form on page
		var form = document.getElementsByTagName("form")[0];
		
		// Check if check box exists because you have logged on too many times.
		if (form.elements[11])
		{
			// Check box
			form.elements[11].checked = true;
		}
		form.submit();
	}
}


// Load all font tags on page.
var font = document.getElementsByTagName("font");

// Check if page is logon success page by finding phrase below.
if (font[0] && font[0].innerHTML == "UWE Residential Network")
{
	// Load <a> tag for page you want to go to.
	var a = document.getElementsByTagName("a")[0];

	// Set target to same window
	a.setAttribute("target","_self");

	// Go to web address
	window.location.href = a.href;
}

