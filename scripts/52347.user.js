// --------------------------------------------------------------------
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Axeso5 - Expansión del Foro", and click Uninstall.
//
// --------------------------------------------------------------------


// ==UserScript==
// @name          Axeso5 - Expansión del Foro
// @namespace     http://www.priston.hostei.com/
// @description   Expande el espacio del Foro de Axeso5!
// @include       http://www.axeso5.com/foro
// @include       http://www.axeso5.com/foro/*
// @version       0.1
// @author        Zixem (http://www.priston.hostei.com/)
// ==/UserScript==


(function() {

    var columna = document.getElementsByTagName('td');

    if (columna[0]) {
        columna[0].style.display = 'none';
        columna[0].style.visibility = 'hidden';
    }

    if (columna[1]) {
        columna[1].style.paddingTop = '';
    }

})();