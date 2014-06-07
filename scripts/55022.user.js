// ==UserScript==
// @name Image Title - Alt - Filename / Mod BG for Puzzlit.org
// @description Puts alt text or source filename in image title attribute, if title is empty
// @include *
// ==/UserScript==

// Modified from http://userscripts.org/scripts/show/38635

var images = document.images;
var image;

for (var i = 0; i < images.length; ++i)
{
	image = images[i];
	if (!image.title && image.alt)
		image.title = image.alt;
	if (!image.title)
		{
		var tmpstr = image.src.toString().match( /[^/]+$/ );
		//Truncate strings over 64 characters
		if (tmpstr.length > 64)
			{
			image.alt = tmpstr.substr(tmpstr.length-64,64);			
			}
		else
			{
			image.alt = tmpstr;
			}
		image.title = image.alt;
		}
}

$('#puzzle_field').css("background","url(http://s42.radikal.ru/i095/0908/09/b170381715b4.png)");