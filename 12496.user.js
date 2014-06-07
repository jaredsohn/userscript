// Paypal packing slip link
// Sept 17, 2009
// Copyright (c) 2007-2009, Nancy Walsh
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Paypal packing slip link", and click Uninstall.
// 
// On the accounts page, any items in the table that have 'Print shipping label'
//  button will now also have a 'Packing slip' link to take you directly
//  to the packing slip for that order.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Paypal packing slip link
// @namespace     http://www.knitfoundry.com
// @description   Add a print invoice link to main paypal page
// @include       https://www.paypal.com/us/cgi-bin/webscr?cmd=_login-done*
// @include       https://www.paypal.com/us/cgi-bin/webscr?cmd=_account*
// @include       https://www.paypal.com/us/cgi-bin/webscr?dispatch=*
// ==/UserScript==


function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var allLinks, thisLink, tdlist, elem;

var INFO_STRING = 'info=';
var PACKSLIP_URL = 'https://www.paypal.com/us/cgi-bin/webscr?cmd=_shipping-receipt&'
//  https://www.paypal.com/us/cgi-bin/webscr?cmd=_history-details&info=nQ6M5-sxYbIN-oCrQqFsVBJ6OKKOhdelfvl4vb97J_B0mFtJ7y8tYyJyK44&return_to=my_accounts_page


allLinks = xpath('//a[@href]');

// Loop through all the links on the page to find the one we want
// we have to find the history_details link because they fancified the
// Shipping details
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

	// _history-details is in the link we are looking for    
	if (thisLink.href.indexOf('_history-details') > 0) {
        var transId, linktext, infoindex;
        
        // Determine the magic number to get to the right transaction
	    linktext = thisLink.href.toLowerCase();
            infoindex = linktext.lastIndexOf(INFO_STRING);
		
	    if (infoindex != -1) {
	    
	    	// Build new link
	    	transId = thisLink.href.substring(infoindex);
	
		// Remove all additional parameters to the _ship-now link. we don't need 'em.
            	if (transId.indexOf('&') != -1) {
	    	   transId = transId.substring(0, transId.indexOf('&'));
	    	}

            // now find the order status junk in the same row as the history details
  	    tdlist =  document.evaluate(".//td[@class='orderStatus small']/div[@class='splitButton'] | .//td[@class='orderStatus small firstOrderStatus']/div[@class='splitButton']",
  	               thisLink.parentNode.parentNode, null,
                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                       
            if (tdlist.snapshotLength == 1) {
		var anewLink = document.createElement('a');
		anewLink.href = PACKSLIP_URL + transId;
		anewLink.innerHTML="Packing Slip";
		
		elem = tdlist.snapshotItem(0);
		elem.parentNode.insertBefore(document.createElement('br'), elem.nextSibling);
		elem.parentNode.insertBefore(anewLink, elem.nextSibling);
            }
          
	    
	    
        }
    }    

}



