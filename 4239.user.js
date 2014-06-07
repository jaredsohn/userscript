// ==UserScript==
// @name          jpopsuki hightlight colour tweaker
// @namespace     http://otterish.co.uk
// @description   Sets the highlights in search results to a different colour of your choice
// @include       http://mullemeck.serveftp.org*/jps_beta/*search=*
// ==/UserScript==

// Add event listener to change highlights on load (to avoid clashes with highlight stripper)
window.addEventListener(
    'load',
function() {

// You need the RGB value of the colour you want to make the highlights. Enter each value below after the =

var highlight_red = 189;
var highlight_green = 238;
var highlight_blue = 255;

var allElements, thisElement;
allElements = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if (thisElement.style.backgroundColor == 'rgb(255, 255, 102)')
       thisElement.style.backgroundColor = 'rgb('+highlight_red+', '+highlight_green+', '+highlight_blue+')';
}

},
true);