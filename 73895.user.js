// --------------------------------------------------------------------
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Axeso5 - Fondo del Foro", and click Uninstall.
//
// --------------------------------------------------------------------


// ==UserScript==
// @name          Axeso5 - Fondo del Foro
// @namespace     http://www.zixem.tk/
// @description   Cambia la imagen de fondo del Foro de Axeso5 en todas sus secciones!
// @include       http://foro.axeso5.com*
// @version       0.1
// @author        Zixem (http://www.zixem.tk/)
// ==/UserScript==


(function() {

    var body = document.body;

    if (body) {
        body.style.background = 'url("images/xtreme/foro-priston-baja.jpg") no-repeat scroll center top #A7A9AD';
    }

})();