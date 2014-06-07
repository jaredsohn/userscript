// Greasemonkey user script - eBay unhighlight
//
// This script removes listing highlighting from ebay.
//
// This is also my third greasemonkey script and hence an
// utter hack job. It's slow and it should preserve
// the even-odd gray separation instead of nuking it....
// maybe use row number to assign even/odd classes?
// Coding improvement suggestions welcome.
// 
// written by Stephen Mason


// ==UserScript==
// @name          ebayunhighlight
// @namespace     http://www.stephemason.com/scripts
// @include       http://search.ebay.com/*
// @include       http://ebay.com/*
// @include       http://www.ebay.com/*
// @description	  removes highlighting (purple) from ebay listings
// @exclude
// ==/UserScript==

  var allelements = document.getElementsByTagName("*");
 
  for (var i = 0 ; i < allelements.length ; i++) {

    if(allelements[i].nodeName == "TBODY") { // listing table
      var alltablerows = allelements[i].childNodes;
      for (var j = 0 ; j < alltablerows.length ; j++) { 
      	  // un-hilite based on class name
          if(alltablerows[j].className == "ebB1 ebHl1 single") {
          	alltablerows[j].className = "single";
          }	
          if(alltablerows[j].className == "ebHl1 single") {
          	alltablerows[j].className = "single";
          }
          if(alltablerows[j].className == "ebB1 ebHlOdd single") {
          	alltablerows[j].className = "ebHlOdd single";
          }	
          if(alltablerows[j].className == "ebB1 single") {
          	alltablerows[j].className = "single";
          }
 

      } // end for rows
    } // end code for TBODY
    
    
  } // end for all elements

