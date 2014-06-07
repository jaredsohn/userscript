// ==UserScript==
// @name       Microsoft OWA full - Chrome
// @namespace  http://www.bonkestoter.com/
// @version    0.1
// @description  When you want to use OWA with Chrome you must use the Light version of OWA, with this script you can also use the full version of OWA.
// @include */owa/*
// @copyright  2013 Rick Bonkestoter. Alle rechten voorbehouden.
// ==/UserScript==

function main() {
    
    // get the checkbox object
    var vCheckbox = document.getElementById('chkBsc');
    
    // Remove the disabled attribute
    vCheckbox.removeAttribute("disabled");
    // Remove the checked attrubute
    vCheckbox.removeAttribute("checked");
}

// Fire the main function
main();