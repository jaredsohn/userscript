// Site Icon Changer
// version 1.0
// 10/31/2007

// ==UserScript==
// @name            Site Icon Changer
// @namespace       none
// @description     Changes the site icon for any site 
// @include         *userscripts.org*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Gabe Gorelick
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You can download a copy of the GNU General Public License at <http://www.gnu.org/licenses/>.
END LICENSE BLOCK */


/*
NOTE: This is meant as a sort of "blank template" that can change any site icon into any picture you want. For best results, the picture 
should be 16px x 16px. To customize the script to fit your needs, first 
change the @include to the site where you would like to change the icon. Then change the url where I have specified to the site where the picture resides.    
*/

(function() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'shortcut icon');
	link.setAttribute('href', 

// Change this to the site of the picture you want to use for an icon
	'http://thetangerines.tripod.com/photos/tangerineicon.jpg');

// Sets dimensions of icon. 16px x 16px is the standard size
	link.setAttribute('height', '16px');
	link.setAttribute('width', '16px');

	var head = document.getElementsByTagName('head')[0]; 
	head.appendChild(link);
})();