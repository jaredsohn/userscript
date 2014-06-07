// ==UserScript==
// @name          OKShooters.com De-electionizer 2012
// @description	  Ignoring the best Obama and Romney loving.
// @include       http://www.okshooters.com/forumdisplay.php*
// @include       http://www.okshooters.com/search.php?searchid=*
// @exclude       
// ==/UserScript==

(function() {
    	var allTR;
    	var patt;
	var allIG = new Array(
	"obama",
	"romney",
	"paul ryan",
	"barack",
	"democrats",
	"republicans",
	"dpi",
	"rkm",
	"rugersgr8",
	"election",
	"rickn",
	"biden",
	"senate",
	"buffet",
	"liberal",
	"conservative",
	"fast and furious",
	"eastwood",
	"media matters",
	"audacity of hope",
	"bengazi",
	"clinton",
	"11b1776",
	"profreedomokie" 
	);
	
	var myMatch = new RegExp();
    	
	allTR = document.getElementsByTagName('a');
	// Remove posts that fit the criteria
	for (var i = 0; i < allTR.length; i++) {
		for (var x in allIG) {
		    var myMatch = RegExp(allIG[x], "gim");
		    if(allTR[i].innerHTML.match(myMatch)){
			    allTR[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
	    		}
    		}
    	}

	allTR = document.getElementsByTagName('span');
	// Remove posts that fit the criteria
	for (var i = 0; i < allTR.length; i++) {
		for (var x in allIG) {
		    var myMatch = RegExp(allIG[x], "gim");
		    if(allTR[i].innerHTML.match(myMatch)){
			    allTR[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
	    		}
    		}
    	}


    	
})();
