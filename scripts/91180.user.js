// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/GreaseMokey/Manage User Scripts,
// select "Etsy Header", and click Uninstall.
//
// --------------------------------------------------------------------
//
// 
//
// ==UserScript==
// @name          Etsy Header Links 
// @description   Adds links to the Etsy Header
// @include       http://*.etsy.com*
// @author        Kevin Turgeon (kevin AT krtwood DOT com)
// @version       0.3
// 
// ==/UserScript==
//


// Check if logged in
if((document.getElementById('header').innerHTML.match('Your Account'))) {

	// create two new list items to insert and define their contents
	var elm, newelm, newelm2;
	newelm = document.createElement('li');
	newelm2 = document.createElement('li');
	newelm3 = document.createElement('li');

	newelm.innerHTML = '<a href="http://www.etsy.com/your/listings/sold" title="Sold Orders" id="SoldOrderNotification">Orders</a>';
	newelm2.innerHTML = '<a href="http://www.etsy.com/your/item/create" title="Create New Listing">New Listing</a>';
	newelm3.innerHTML = '<a href="http://www.etsy.com/forums" title="Forums">Forums</a>';


	// look for the right existing elements to insert next to
	elms = document.getElementsByTagName('li');
	if(elms.length) {
		for(var i=0; i<elms.length; i++) {
			var elm = elms[i];
			if(elm.innerHTML.match('ref=si_help')) {
				elm.parentNode.insertBefore(newelm,elm);
				elm.parentNode.insertBefore(newelm2,elm);
			}
			if(elm.innerHTML.match('ref=si_blog')) {
				elm.parentNode.insertBefore(newelm3,elm);
			}

			if(elm.innerHTML.match('activity') && !elm.innerHTML.match('ref=your_etsy')) {
					elm.parentNode.removeChild(elm);
				
			}

		}
	}


}
	
