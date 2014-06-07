// Daily Dilbert newspaper
// version 1.1
// last updated June 19, 2007 
// Copyright (c) 2007 Samuel Saint-Pettersen
// Released under the GPL licence
// http://www.gnu.org/copyleft/gpl.html
// ---------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install it, you need Greasemonkey: http://greasemonkey.mozdev.org
// ---------------------------------------------------------------------
// Changes from 1.0: 
// * Properly removes advertisements (incl. 468x60 banners)
// * Tidied up script a little bit.
// ---------------------------------------------------------------------
// ==UserScript==
// @name Daily Dilbert newspaper
// @version 1.1
// @author Samuel Saint-Pettersen
// @description Have a tidier Daily Dilbert in your inbox.
// @include http://mail.google.com/*
// @include https://mail.google.com/*
// ==/UserScript==
(function() {

	// replacement for Daily Dilbert logo - this one is a newspaper style banner;
	// useful if you are using the G-mail superclean skin
	var replacement = "http://img400.imageshack.us/img400/2477/dailydilbertot9.png";

	// find original Daily Dilbert logo and replace it with our new snazzy version;
	// remove advertisements, bullets and Comics.com logo and other unnecessary images
	var images = document.getElementsByTagName("img").length;
	
	// alt attribute keywords to look for to remove images
	var keyw = new Array(6);
	keyw[0] = "Daily Dilbert";
	keyw[1] = "";
	keyw[2] = "Dilbert DataViz";
	keyw[3] = "When Body Language Goes Bad";
	keyw[4] = "bullet";
	keyw[5] = "Comics.com";
	keyw[6] = "Advertisement";
	
	for(var i = 0; i < images; i++) 
	{
		var img = document.getElementsByTagName("img")[i];
		var alt = img.getAttribute("alt");
		if(alt == keyw[0])
		{
			img.src = replacement;
			img.setAttribute("width", "400");
			img.setAttribute("height", "76");
		}
		else if(alt==keyw[1]||alt==keyw[2]||alt==keyw[3])
		{	
			img.style.display = "none";
		}
		else if(alt==keyw[4]||alt==keyw[5]||alt==keyw[6])
		{
			img.style.display = "none";
		}
		// remove banner advertisement
		var url = new String(img.getAttribute("src"));
		var re = new RegExp(".*tribalfusion.*", "g");
		var ad = url.search(re);
		if(ad != -1)
		{
			img.style.display = "none";
		}
	}
	// hide unnecessary text (incl. hyperlinks) via table cells
	// and change background colour to #ffffff (white)
	var tds = document.getElementsByTagName("td").length;
	for(var i = 0; i < tds; i++)
	{
		var td = document.getElementsByTagName("td")[i];
		var width = td.getAttribute("width");
		var bgcolor = td.getAttribute("bgcolor");
		if(width == "323")
		{
			td.style.display = "none";
		}
		if(bgcolor == "#336699")
		{
			td.setAttribute("bgcolor", "#ffffff");
		}
		else if(bgcolor = "#ffcc66")
		{
			td.setAttribute("bgcolor", "#ffffff");
		}
	}
	// make remaining text one size bigger
	document.getElementsByTagName("font")[0].setAttribute("size", "2");
})();
