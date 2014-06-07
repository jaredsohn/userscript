// ==UserScript==
// @name          No Ugly Courier
// @description   Changes every ugly unreadable italic Courier to Courier New.
// @include       *
// ==/UserScript==

// Author: Diogo Kollross <diogoko@gmail.com>

var allElements = document.getElementsByTagName('*');

for (var i = 0; i < allElements.length; i++) {
    var elementStyle = getComputedStyle(allElements[i], '');
    if (/^courier($|,)/i.test(elementStyle.fontFamily)) {
        allElements[i].style.fontFamily = 'Courier New';
    }
}
