// nytimespopupremover
// version 0.7 alpha
// 2005-12-29
// Copyright (c) 2005, Aaron Patterson
// Released under the GPL version 3
// http://www.gnu.org/copyleft/gpl.html
//
//  Removes popup links from the nytimes so that the links open properly in 
//  new windows or new tabs in firefox. 
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "nytimespopupremover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            nytimes popup remover
// @namespace       http://slashdot.org/~lupine/  
// @description     Replaces popup links on the nytimes
// @include         *nytimes.com*
// ==/UserScript==

(function() {
 
 function AdjustPopupLinks() { 
 	
  var allLinks, thisLink;
  allLinks = document.evaluate('//a[@href]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  var re, result, hreftext;

  re = new RegExp('javascript:pop_me_up2');  //this is the javascript funciton that nytmes uses to launch popup windows.

  //GM_log('AdjustPopupLinks start')
  
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    hreftext = thisLink.href;
	//vistext = thisLink.innerHTML;
    //GM_log('AdjustPopupLinks link: ' + thisLink.innerHTML + ' ' + hreftext);   //use this to see what html links are being checked
	
    result = re.exec(hreftext);  //test the hyperlink to see if it includes the javascript popup function
	
	if (result != null) {
		var strary = thisLink.href.split("'");  //split parameters out of javascript popups - the first param is the real html http address to launch.
		//GM_log('AdjustPopupLinks link2: ' + strary[1]);
		if (strary[1]) thisLink.href = strary[1];  //remove javascript popup code - launch popup in their own window.
	  } // end of javascript popup search		
	}	// end for i
  
   //GM_log('AdjustPopupLinks done')
  
 }  	// end function

 AdjustPopupLinks();

 //if the pages is slow to load then pause before processing... 
 // window.setTimeout(AdjustPopupLinks,500);

})();


