// ==UserScript==
// @author         Ben Lee
// @name           Tired Eyes
// @description    Changes color of page to grey text on black background to make pages easier to read.  Uses F2 to toggle colors on and off.
// @namespace      http://www.benslee.com/
// @include        *
// ==/UserScript==

/*
	Notes:  This has not been thoroughly tested.   It was made to save my eyes.  I love reading nytimes.com, but after a while, my eyes start bugging out because of the white background.  I put togther this script with some code borrowed from various sites on the internet.  Unfortunately I don't remember the sites to properly credit those involved.

	Feb 22, 2008 - ver 1.1 - Added comments, cleaned up code, and eliminated js warning by switching to style instead of link tag.
	Feb 22, 2008 - ver 1.0 - Released into the wild.
*/

var teNewBackgroundColor, teNewTextColor, teNewLinkColor, teNewVisitedColor, teMyKeyCode;
var teNewStyle

//  Change any of these to values you think are more appropriate.
teNewBackgroundColor = '#000000';  // Background replaced with this color.
teNewTextColor = '#CCCCCC';  // Text color changed to this color.
teNewLinkColor = '#CCCCCC';  // Link color changed to this color.
teNewVisitedColor = '#DDDDDD';  // Visited link color changed to this color.
teMyKeyCode = 113; //  keyCode 113 represents F2

// Create new style tag.
teNewStyle = document.createElement('style')
teNewStyle.id = 'teStylesheet';
teNewStyle.innerHTML = '* {background: ' + teNewBackgroundColor + ' !important; color: ' + teNewTextColor + ' !important} '
teNewStyle.innerHTML += ':link, :link * { color: ' + teNewLinkColor + ' !important}'
teNewStyle.innerHTML += ':visited, :visited *, { color: ' + teNewVisitedColor + ' !important};'

window.addEventListener('keypress', changeColors, true);

function changeColors(e) {
	var teNewStyleSheet, teOldStyleSheet, teStyles;

	if (e.keyCode == teMyKeyCode) {
		teOldStyleSheet = document.getElementById("teStylesheet")
		if (teOldStyleSheet){ // if oldStyleSheet already exists, it is removed.
			document.getElementsByTagName("head")[0].removeChild(teNewStyle );
		} else {  // if oldStyleSheet does not exist, it is created and added.
			document.getElementsByTagName("head")[0].appendChild(teNewStyle);
		}
	}
}