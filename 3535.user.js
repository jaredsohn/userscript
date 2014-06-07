// This is a Greasemonkey script which changes the CSS-style of the Flashback forum
//
// ==UserScript==
// @name	Remove the red star on Flashback
// @description ?ndrar utseendet p? Flashback
// @include	http://www.flashback.info*
// ==/UserScript==

var star = "R0lGODlhDwAPAKIAAAAAAP///4uLi1dXVy4uLhUVFQUFBf///yH5BAEAAAcALAAAAAAPAA8AAANA\
eLo3/K/AOYCYjwCCmQHSM4yjBmwEQQ7F6b5ncR0mfHJM7RoOpG+Y1iv0EJwMhI/FB7oIWjhGIaog\
EBWCnmiWAAA7";

var cat = "R0lGODlhDwAPALMAAAAAAP///0xMS39/ftTU05+fnubl5YqJifT09MDAwK6urpKSkmtraycnJxcX\
F////yH5BAEAAA8ALAAAAAAPAA8AAARo8Mk5Eb03GTwNMsSycY/CNMJikYUDAMfKFc0bU/LDAI4z\
5IYR4eQQCEYeBGHDMDYGjcJjKSEkDj2joBHVPBYCRoHGA4ibCsJAsCIcBgqE8tBQGA6FxFKeGAzG\
CRQgQ2YKVyocfUgHGxEAOw==";

var imageData = cat;

var allImages = document.getElementsByTagName('img');
var i;

for (i=0; i<allImages.length; i++)
{
	if ((allImages[i].src.indexOf("images2006/misc/navbits_start.gif") != -1) ||
		(allImages[i].src.indexOf("images2006/misc/navbits_start_start.gif") != -1))
	{
		allImages[i].src = "data:image/gif;base64," + imageData;
	}
}