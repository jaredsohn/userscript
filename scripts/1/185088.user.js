// ==UserScript==
// @name          Viadeo - Unblur
// @description   Show a viadeo profile without being logged.
// @author        Maxime Ancelin
// @version       1
// @include       http://fr.viadeo.com/*/profile/*
// ==/UserScript==

// Function to remove a DOM element
function removeElement(element) {
    elem = document.getElementById(element);
    elem.parentNode.removeChild(elem);
}

// Clean page for better profile reading
removeElement('registrationProfile');
removeElement('recapCallAction');


// unblur
do {
    nextBlurry = document.getElementsByClassName("blurry")
    nextBlurry[0].classList.remove("blurry");
} while (nextBlurry.length > 0);

