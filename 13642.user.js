// ==UserScript==
// @name          Remove ads from ARS News *fixed*
// @namespace     http://logankoester.com
// @description   Remove the "ad columns" from the ARS News Articles. Fixed default @include and also now removes horizontal banner at the top of the page.
// @include       http://arstechnica.com/*.ars*
// ==/UserScript==

//***Credit given to the coder for the http://www.realestate.com.au/ script*****

//******************************************************************************

(function() {
    var divs=document.getElementsByTagName("div");
    for(var i=0; i < divs.length; i++) {
        /* look for the class name */
        if(divs[i].className.indexOf("Ad") != -1 || divs[i].className.indexOf("Ad") != -1) {
            divs[i].style.display="none";
        }
    }
}) ();
document.getElementById('Banner').style.display="none";