// ==UserScript==
// @author         LL25255252
// @name           Tired Eyes Tweaked
// @description    Changes color of page to text & background to make pages easier to read.  Uses some Fkey to toggle colors on and off.
// @namespace     http://userstyles.org/users/14682
// @include        *
// ==/UserScript==

/*
Link - http://userscripts.org/scripts/show/116525 - I've only fixed and tweaked this script http://userscripts.org/scripts/show/23129 
*/

var teNewBackgroundColor, teNewTextColor, teNewLinkColor, teNewVisitedColor, teMyKeyCode;
var teNewStyle

//  Change any of these to values you think are more appropriate.
teNewBackgroundColor = '#A1C5EE';  // Background replaced with this color.
teNewTextColor = '#000000';  // Text color changed to this color.
teNewLinkColor = '#0000CD';  // Link color changed to this color.
teNewVisitedColor = '#800080';  // Visited link color changed to this color.
teMyKeyCode = 113; //  keyCode 113 represents F2

// Create new style tag.
teNewStyle = document.createElement('style')
teNewStyle.id = 'teStylesheet';

// not using * b/c it conflicts Firegestures - trail drawing not shown 

teNewStyle.innerHTML = 'td,div,div *,html,body,td,span,li,p,font,blockquote,dd,h1,h2,h3,h4,h5,h6{text-shadow:none!important;background: ' + teNewBackgroundColor + ' !important; color: ' + teNewTextColor + ' !important} '
teNewStyle.innerHTML += ':link, :link * { color: ' + teNewLinkColor + ' !important}'
teNewStyle.innerHTML += ':visited,:visited * { color: ' + teNewVisitedColor + ' !important};'

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