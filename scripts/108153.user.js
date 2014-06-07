// --------------------------------------------------------------------



//





// This is a Greasemonkey user script.  To install it, you need





// Greasemonkey 0.3 or later: http:

//greasemonkey.mozdev.org/





// Then restart Firefox and revisit this script.





// Under Tools, there will be a new menu item to "Install User Script".





// Accept the default configuration and install.



//





// To uninstall, go to Tools/Manage User Scripts,





// select "Hello World", and click Uninstall.



//





// --------------------------------------------------------------------



//





// ==UserScript==





// @name          Grooveshark AdFree



// @namespace     arne.wendt@tu-harburg

// @description   Removes the Grooveshark-AdBar



// @include       http://grooveshark.com/*







// ==/UserScript==

window.addEventListener(

    'load', 

    function() { 

		document.getElementById("capital").innerHTML=""; 

		document.getElementById("application").style.marginRight=0; 

		document.getElementById("page_wrapper").style.width=816; },

    true);