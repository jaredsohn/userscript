// Greasemonkey user script - eBay de-feature
//
// This script removes featured item listings from ebay.
// They still show up in the normal listings, this just
// means you won't see 'em twice.
//
// This is also my second greasemonkey script and hence an
// utter hack job. Suggestions for coding improvements welcome.
//
//
// written by Stephen Mason




// ==UserScript==
// @name          ebaydefeature
// @namespace     http://www.stephemason.com/scripts
// @include       http://ebay.com/*
// @include       http://www.ebay.com/*
// @include       http://search.ebay.com/*
// @description	  removes featured item listings from ebay
// @exclude
// ==/UserScript==



  var allelements = document.getElementsByTagName("*");
 
  for (var i = 0 ; i < allelements.length ; i++) {

    if(allelements[i].nodeName == "TBODY") { // listing table
      var alltablerows = allelements[i].childNodes;
      var featflag = 0;
      for (var j = 0 ; j < alltablerows.length ; j++) { 
      	  
      	  // set flag if featured items found      
          if(alltablerows[j].firstChild.className == "navigation ebFeatMsg") {
            featflag = 1;
          }	
          
          // turn off flag when end of featured items is reached
          var endtest = alltablerows[j].firstChild.firstChild;
          if(endtest) {
            if(alltablerows[j].firstChild.firstChild.className == "navigation ebMsg") {
            	featflag = 0; 
            	alltablerows[j].style.display = "none"; 
            }
          }  	
          
          // hide current row if featflag is set
          if(featflag == 1 ) {
            alltablerows[j].style.display = "none";
          }
                            
      } // end for rows
    } // end code for TBODY
        
  } // end for all elements



