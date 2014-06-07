// ==UserScript==
// @author         Stas Otovchits
// @name           Tired Eyes Improved
// @description    Changes color of page to grey text on black background to make pages easier to read.  Uses F2 to toggle colors on and off.
// @namespace      Tired_Eyes_Improved
// @include        *
// ==/UserScript==

/*
	Improved version of Tired Eyes original by Ben Lee
	Nov 27, 2011 - ver 1.0 - Released into the wild.
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

window.addEventListener('keypress', changeMode, true);

if (GM_getValue('teMode', false) == true) {
    changeColors();
}

function changeMode(e) {
    if (e.keyCode == teMyKeyCode) {
        GM_setValue('teMode', !GM_getValue('teMode', false));
        changeColors();
	}
}

function changeColors() {
	var teNewStyleSheet, teOldStyleSheet, teStyles;

    teOldStyleSheet = document.getElementById("teStylesheet")
    if (teOldStyleSheet){ // if oldStyleSheet already exists, it is removed.
        document.getElementsByTagName("head")[0].removeChild(teNewStyle );
    } else {  // if oldStyleSheet does not exist, it is created and added.
        document.getElementsByTagName("head")[0].appendChild(teNewStyle);
    }
}
