// ==UserScript==
// @name           Simple Google
// @description    Simplifies the Google homepage, stripping away everything but the search bar, the buttons, and the logo, which it ensures is the plain Google logo
// @author         Austin
// @include        http://google.com/
// @include        http://www.google.com/
// @include        http://google.com/#
// @include        http://www.google.com/#
// @exclude       http://google.com/s*
// @exclude       http://www.google.com/s*
// @exclude       http://google.com/i*
// @exclude       http://www.google.com/i*
// @version        1.0
// ==/UserScript==

// Kills the Nav Bar
document.styleSheets[0].addRule('#mngb', 'visibility:hidden');

// Kills all the links
document.styleSheets[0].addRule('a', 'display:none');

// Kills the Change Background Image text
document.styleSheets[0].addRule('#cpf', 'display:none !important');

// Kills the footer
document.styleSheets[0].addRule('#footer', 'display:none');
document.styleSheets[0].addRule('#fctr', 'display:none');

// Kills all buttons except the "Search" one that completes the search bar in Google Instant
var buttons = document.getElementsByClassName('ds');
for (i = 0; i < buttons.length; i++)
{
	if (buttons[i].getElementsByTagName('input')[0].value != 'Search')
	{
		buttons[i].style.visibility='hidden';
	}
}

// Turn the Logo plain
document.getElementById("hplogo").src='/images/logos/ps_logo2.png';			// The normal Google logo
//document.getElementById("hplogo").src='/images/logos/ps_logo2a_cp.png';		// The white Google logo