// ==UserScript==
// @name            Lighter
// @author          andrzej.tucholka@gmail.com
// @namespace       -
// @description     Finds a text in the body of the webpage and highlights it
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         *
// @released        2012-08-11
// @updated         2012-08-11
// @compatible      Greasemonkey
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
 
(function(){
 
    function lighter(){
        this.append_stylesheet(' .c1 { color: white; background-color: green; } .c2 { color: black; background-color: red; }');

        document.body.innerHTML = document.body.innerHTML.replace(/Wojtek/gi, "<span class='c1'>Wojtek</span>");
        document.body.innerHTML = document.body.innerHTML.replace(/Ania Karkoszka/gi, "<span class='c2'>Ania Karkoszka</span>");

    };


    lighter.prototype.append_stylesheet = function(css){
        var styletag = document.createElement("style");
        styletag.setAttribute('type', 'text/css');
        styletag.setAttribute('media', 'screen');
        styletag.appendChild(document.createTextNode(css));

        document.getElementsByTagName('head')[0].appendChild(styletag);
    };

    var lighter = new lighter();
})();