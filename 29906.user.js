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
// @description   Removes Apple iPhone hype
// @include       *
// @version       0.0.1
// ==/UserScript==

(function() 
{
	var src = document.body.innerHTML;

	var truth = "";

	// Rewrite
	while(src.indexOf("Apple")>0)
	{
		src = src.replace("Apple", "");
	}

	while(src.indexOf("iPhone 3G")>0)
	{
		src = src.replace("iPhone 3G", truth);
	}

	while(src.indexOf("3G iPhone")>0)
	{
		src = src.replace("3G iPhone", truth);
	}

	while(src.indexOf("iphone")>0)
	{
		src = src.replace("iphone", truth);
	}

	while(src.indexOf("iPhone")>0)
	{
		src = src.replace("iPhone", truth);
	}

	while(src.indexOf("IPhone")>0)
	{
		src = src.replace("IPhone", truth);
	}

	while(src.indexOf("Iphone")>0)
	{
		src = src.replace("Iphone", truth);
	}

	document.body.innerHTML = src;

	return;
})();

// 0.0.1		Initial release.
