// ==UserScript==
// @name          Remove ads from ARS News
// @namespace     http://www.jamielawson.com
// @description	  Remove the "ad columns" from the ARS News Articles
// @include       http://arstechnica.com/news.ars
// ==/UserScript==
//***Credit given to the coder for the http://www.realestate.com.au/ script*****
//******************************************************************************
 
(function() {
    var divs=document.getElementsByTagName("div");
    
    for(var i=0; i < divs.length; i++) {
        /* look for the class name */
        if(divs[i].className.indexOf("Ad") != -1 || divs[i].className.indexOf("Ad") != -1) {
            /* found, do something */
            divs[i].style.display="none";
        }
    }

}) ();