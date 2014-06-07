// Greasemonkey user script - eBay de-feature
//
// This script removes featured item listings from ebay
// ***using eBay's new search experience***.
// They still show up in the normal listings, this just
// means you won't see 'em twice.
//
// originally written by Stephen Mason

// Updated by TwoHawks 06/2009
// Really, this is an utter hack job.. I used Stephen's as a base.
// This is tested on us, uk, and germany ebay using "new search experience" setting 
// Will not work unless you are opted into the new search experience.

// ==UserScript==
// @name          ebaydefeature2 for ebay's "new search experience"
// @namespace     http://www.stephemason.com/scripts
// @include       http://ebay.com/*
// @include       http://*search.ebay.com/*
// @include       http://*shop.ebay.*
// @description	  removes featured item listings from ebay
// @exclude
// ==/UserScript==



  var allelements = document.getElementsByTagName("*");
 
  for (var i = 0 ; i < allelements.length ; i++) {

    if(allelements[i].nodeName == "TABLE") { // listing table
      var alltablerows = allelements[i].childNodes;
      var featflag = 0;
      var featflagCutoff = 0;
      for (var j = 0 ; j < alltablerows.length ; j++) { 
      	  
      	  // set flag if featured items found      
          if(alltablerows[j].parentNode.className.match("nol") ) {
            featflag = 1;
          }	
          
          // turn off flag when end of featured items is reached
          var endtest = alltablerows[j].parentNode.nextSibling;
	  if (endtest) { 
	  	if (  (endtest.nodeName == "DIV") && endtest.className == "hr" ) { 
		  	endtest = endtest.nextSibling;
			if (endtest) {
		  		if (endtest.className == "divider g-nav") {
		  			featflagCutoff = 1;
		  		}
			}
		}
	  }
          
          // hide current row if featflag is set
          if(featflag == 1 ) {
            alltablerows[j].style.display = "none";
          }
          if (featflagCutoff == 1) { exit; }
                            
      }
    }
        
  }
