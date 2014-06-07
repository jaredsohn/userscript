// ==UserScript==
// @name Image Title - Alt - Filename
// @namespace http://userscripts.org/users/75115
// @description Puts alt text or source filename in image title attribute, if title is empty
// @include *
// ==/UserScript==

// http://userscripts.org/scripts/show/38635
//
// A simple script for image title attribute.
// If title tag is populated, it does nothing.
// If title tag is empty and alt tag is populated, puts alt tag in title.
// If alt and title tag are empty, puts the filename in alt and title.
// Useful in Firefox to show alt text or filename as a tooltip pop-up
// for images where there is no title text.
// 
// Modified from http://userscripts.org/scripts/show/30956

var images = document.images;
var i = 0; 

for (i in images)
{	
	if (!images[i].title && images[i].alt)  //IF title is empty and alt is populated
	{
		images[i].title = images[i].alt;	//THEN populate title with alt
	}
		
	if (!images[i].title)					//IF title is still empty THEN fill in alt with filename
	{
		var tmpstr = images[i].src.toString().match( /[^/]+$/ );
		
		//Truncate strings over 64 characters
		if (tmpstr.length > 64)
		{
			images[i].alt = tmpstr.substr(tmpstr.length-64,64);			
		}
		else
		{
			images[i].alt = tmpstr;
		}
		images[i].title = images[i].alt;	//populate title with updated contents of alt
	}
}

