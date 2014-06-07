//
// Copyright (c) 1984
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
// select "iPhone", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          iPhone
// @namespace     http://localhost
// @description   Replaces hype with truth.
// @include       *
// @version       0.0.1
// ==/UserScript==

(function() 
{
	var src = document.body.innerHTML;

	var truth = "Rip-off";

	// Rewrite
	
	while(src.indexOf("iPhone 3G")>0)
	{
		src = src.replace("iPhone 3G", "more expensive " + truth);
	}

	while(src.indexOf("iphone")>0)
	{
		src = src.replace("iphone", truth.toLowerCase());
	}

	while(src.indexOf("iPhone")>0)
	{
		src = src.replace("iPhone", truth);
	}

	while(src.indexOf("IPhone")>0)
	{
		src = src.replace("IPhone", truth);
	}

	while(src.indexOf("Comcast")>0)
	{
		src = src.replace("Comcast","Comsucks");
	}


	document.body.innerHTML = src;

	return;
})();

// 0.0.1		Initial release.
