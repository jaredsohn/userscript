// ==UserScript==
// @name          Remove regional ads from Heise News
// @namespace     http://www.heise.de
// @description	  Remove the "adbottom_itmarkt" and "addbottom_jobs" columns from the heise News Articles
// @include       http://www.heise.de/*
// ==/UserScript==
//***Credit given to the coder for the http://www.realestate.com.au/ script*****
//******************************************************************************
  
(function() {
    var divs=document.getElementsByTagName("div");
    
    for(var i=0; i < divs.length; i++) {
        /* look for the class name */
        if(divs[i].className.indexOf("adbottom_itmarkt") != -1) {
            /* found, do something */
            divs[i].style.display="none";
        }
        if(divs[i].className.indexOf("adbottom_jobs") != -1) {
            /* found, do something */
            divs[i].style.display="none";
        }
    }

}) ();
