// ==UserScript==
// @name        Amazon Default Kindle Delivery
// @namespace   http://rob.iverson
// @include     http://www.amazon.com/*
// @version     1
// ==/UserScript==


(function() {

    var NAME = "Jessica's Kindle Fire";
    
    var sels = document.getElementsByTagName("select");

    for (var i = 0 ; i < sels.length ; i++) {

	var options = sels[i].getElementsByTagName("option");

	for (var j = 0 ; j < options.length ; j++) {    
	    GM_log("checking option # " + i);
	    if ( options[j].innerHTML == NAME ) {
	        GM_log("found option with right name!");
	        options[j].selected = true;
	        break;
            }
	}
    }
    
})();

