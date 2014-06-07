// Facebook Age Display
//
// Version 1.2
//
// Date Written: 2007-20-09
// Last Modified: 2008-21-01 12:37 AM (00:37)
//
// (c) Copyright 2007 Ali Karbassi.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Facebook Age Display", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Displays the age of the profile you are viewing. This requires the
// user to show their birthday year.
//
// NOTE: This does not alter, delete, edit, add, or anything else to
//       your facebook profile. Just remove or disable this script and
//       everything will be displayed the same as it used to
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Facebook Age Display 1.2
// @author      Ali Karbassi
// @namespace   http://www.karbassi.com
// @description Displays the age of the profile you are viewing. This requires the user to show their birthday year.
// @include     http://*facebook.tld/profile.php*
// ==/UserScript==

var div = document.getElementById('Birthday-data');

if( div )
{
	displayAge(getAgeInYears(), div);
}

// Functions
function getAgeInYears()
{
	var bday = new Date(document.getElementById('Birthday-data').textContent);
	if( bday.toString() == 'Invalid Date' ) return -1;
	var calc = 31556925993.6; // Milliseconds in a year (1000 * 60 * 60 * 24 * 365.242199)
	return Math.floor(((new Date()).getTime() - bday.getTime())/calc);
}

function displayAge(age, container)
{
	if (age != -1)
	{
		var span = document.createElement('span');
		span.innerHTML = ' (' + age + ' years old)';
		container.appendChild(span);
	}
}