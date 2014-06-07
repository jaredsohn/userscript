// ==UserScript==
// @name           Die Ron Paul Spammers
// @description    Automatically hides all Ron Paul stories
// @include        *
// ==/UserScript==

// cased insensitive
regex1 = /Ron.Paul|Dr[. ]+Paul|Doctor.Paul|Pau1/i;

var allElements, thisElement;
allElements = document.getElementsByTagName('*');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    if (regex1.exec(thisElement.textContent)) {

    thisElement.textContent = "Removed a bunch of crap about Ron Paul";
//	thisElement.parentNode.removeChild(thisElement);
    }
}