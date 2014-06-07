// ==UserScript==
// @name Oldifier
// @namespace PurpleScripts
// @description Bypasses YouTube age verification when you're not logged in. Videos that require verification will take up the entire tab.
// ==/UserScript==

if(window.location.href.indexOf("verify_age") != -1)
	{
		var blockPage = window.location.href;
		var sexyPageID;
		var IDIndex = blockPage.indexOf("%3Fv%3D");
		sexyPageID = blockPage.substr(IDIndex + 7);
		window.location = "http://www.youtube.com/v/" + sexyPageID;
	}