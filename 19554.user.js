// RELEASE NOTES
// =============
// v1.2.10 (02/02/2010)
// * Had to hardcode values in order to get script to work due to my Javascript programming skills sucking.  Will probably
//   need a significant rewrite of this code soon.  Must learn how to write good JS code first.
//
// v1.2.9 (10/21/2009)
// * Fixed error due to PayPal changing their HTML values on their shipping page.
//
// v1.2.8 (03/07/2009)
// * Updated script to adjust for Goozex's update to their new shipping page.  This might happen a lot over the next few weeks.
// * Removed copyright, because that was stupid.
//
// v1.2.7 (02/26/2009)
// * Updated script to adjust for Goozex's new shipping page...removing teh suck.
//
// v1.2.6 (07/05/2008)
// * Updated script to allow for different default settings based on the service that you're
//   currently using.
//
// v1.2.5 (05/30/2008)
// * Tweaked the address parsing to be a little more forgiving...again.
//
// v1.2.4 (03/05/2008)
// * Tweaked the address parsing to be a little more forgiving.
//
// v1.2.3 (02/06/2008)
// * Fixed a bug in Bookmooch where addresses that didn't seperate the city and the state with
//   a comma didn't get scraped properly.  This was fixed by updating the REGEXP for the city,
//   state,zip search.
//
// v1.2.2 (02/02/2008)
// * Fixed a bug in Bookmooch where if there were more than one book to send out, the bookmooch address
//   scrape would always scrape the address from the FIRST address on the page, instead of the address
//   beside the button the user pushed.
//
// v1.2.1 (01/09/2008)
// * Fixed a bug where multiline addresses weren't working in both Goozex and BookMooch
//
// v1.2.0 (01/07/2008)
// * Added initial support for Book Mooch
//
// v1.1.2 (12/21/2007)
// * Updated first and last name parsing
//
// v1.1.1 (12/19/2007)
// * Code reorganization to help in maintainability and extensibility
//
// v1.1.0 (12/18/2007)
// * Added event listens for page load to ensure page is fully loaded before modifying the DOM
// * Added functions to set default shipping prefs in PayPal which are currently set via code params
//
// v1.0.0 (12/18/2007)
// * Initial release of script.
//
//
// KNOWN ISSUES
// ============
// * Currently, only works with US addresses
//
//
// ==UserScript==
// @name           Ship with PayPal
// @namespace      ryanhagan.net
// @description    Creates a button on the shipping page that automatically launches the PayPal shipping link
// @include        http://www.goozex.com/trading/asp/offeracceptok.asp?id=*
// @include        http://goozex.com/trading/asp/offeracceptok.asp?id=*
// @include        http://www.bookmooch.com/m/pending*
// @include        http://bookmooch.com/m/pending*
// @include        https://www.paypal.com/us/cgi-bin/webscr?*
// ==/UserScript==


// OBJECT EXTENSIONS
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/gmi, '');
};



var SHOW_DEBUG = false;

_DEBUG("Begin script");


var PAYPAL_SHIPPING_URL = "https://www.paypal.com/us/cgi-bin/webscr?cmd=_ship-now";


var GOOZ_DESTINATION_LABEL_SEARCH = "//div[text()='Destination address:']";
var GOOZ_ADDRESS_NAME_LABEL_SEARCH = "//tr/td[text()='name:']/parent::tr/td[2]/span/text()";
var GOOZ_ADDRESS_ADDRESS_LABEL_SEARCH = "//tr/td[text()='address:']/parent::tr/td[2]/span/text()";
var GOOZ_ADDRESS_COUNTRY_LABEL_SEARCH = "//tr/td[text()='country:']/parent::tr/td[2]/span/text()";

var MOOCH_BOOKS_TO_SEND_SEARCH = "//table/tbody/tr/td/font[text()='Books accepted to send']";
var MOOCH_UNSHIPPED_BOOKS_TABLE_SEARCH = "table[@width='890']";
var MOOCH_BUTTON_CONTAINER_SEARCH = "tbody/tr/td[5]";
var MOOCH_ADDRESS_INFO_SEARCH = "tbody/tr/td/table/tbody/tr/td[text()='Address:']/following-sibling::td[@valign='top']";

var PAYPAL_SHIPPING_HEADER_SEARCH = "//h2[text()='U.S. Postal Service - Create Your Shipping Label']";
var WEIGHT_LBS_SEARCH = "//span[@id='WeightField']/input[@name='weight_lbs']";
var WEIGHT_OZS_SEARCH = "//span[@id='WeightField']/input[@name='weight_ozs']";

var CITY_STATE_ZIP_SPLIT_REGEXP = /^([\w\s\.\'\-]+?)[,]?[ ]?([\w]+)[,]?[ ]*([\d]{5}(\-[\d]{4})?)$/;
var MOOCH_ADDRESS_SPLIT_REGEXP = /^([\w\s\&\#\,\.\'\-]+?)(\<br\>|$)/gim;


var SHIPPING_TYPES = {
	"Priority" : { "index" : 1, "keyword" : "PriorityMail", "desc" : "Priority Mail" },
	"Express" : { "index" : 2, "keyword" : "ExpressMail", "desc" : "Express Mail" },
	"FirstClass" : { "index" : 3, "keyword" : "FirstClassMail", "desc" : "First-Class Mail" },
	"Media" : { "index" : 4, "keyword" : "MediaMail", "desc" : "Media Mail" },
	"Parcel" : { "index" : 5, "keyword" : "ParcelPost", "desc" : "Parcel Post" }
}

// SET THE DEFAULT SHIPPING TYPE FOR EACH SERVICE
// THIS SHOULD EVENTUALLY BE MOVED TO THE USER CONFIG
var DEFAULT_SHIPPING_TYPE = {
	"goozex" : "FirstClass",
	"bookmooch" : "Media"
}

var PACKAGE_TYPES = {
	"Envelope" : { "index" : 1, "keyword" : "PACKAGE_OR_FLAT_ENVELOPE", "desc" : "Package/Thick Envelope" },
	"Package" : { "index" : 2, "keyword" : "LARGE_PACKAGE", "desc" : "Large Package" },
	"Box" : { "index" : 3, "keyword" : "FLAT_RATE_BOX", "desc" : "Flat Rate Box (Priority Mail only)" }
}

// SET THE DEFAULT PACKAGE TYPE FOR EACH SERVICE
// THIS SHOULD EVENTUALLY BE MOVED TO THE USER CONFIG
var DEFAULT_PACKAGE_TYPE = {
	"goozex" : "Envelope",
	"bookmooch" : "Envelope"
}

var DEFAULT_PACKAGE_WEIGHT_LBS = 0;
var DEFAULT_PACKAGE_WEIGHT_OZS = 7;



// *******************
// Main program object
// *******************
var SWP =
{
	init : function()
	{
		// meta data
		this.version = "1.2.9";
		this.scriptname = "ship_with_paypal.user.js";

		// register menu items
		GM_registerMenuCommand( "Set Defaults", SWP.UI.Handlers.setDefaults, "m", "control alt","d" );

		// begin setup program
		var currentLocation = this._determineLocation();
		switch( currentLocation )
		{
			case "goozex" :
				// set default shipping and package type for this location
				SWP.Config.setShippingType( SHIPPING_TYPES[ DEFAULT_SHIPPING_TYPE['goozex'] ] );
				SWP.Config.setPackageType( PACKAGE_TYPES[ DEFAULT_PACKAGE_TYPE['goozex'] ] );
				// wait for page to load and then create the button
				window.addEventListener('load', SWP.UI.createGoozexButton, true);
				break;

			case "bookmooch" :
				// set default shipping and package type for this location
				SWP.Config.setShippingType( SHIPPING_TYPES[ DEFAULT_SHIPPING_TYPE['bookmooch'] ] );
				SWP.Config.setPackageType( PACKAGE_TYPES[ DEFAULT_PACKAGE_TYPE['bookmooch'] ] );
				// wait for page to load and then create the button
				window.addEventListener('load', SWP.UI.createBookMoochButtons, true);
				break;

			case "paypal" :
				// wait for page to load and then fill in the form with our data
				window.addEventListener('load', SWP.UI.fillInPayPalShippingLabelInfo, true);
				break;
		}
	},

	_determineLocation : function()
	{
		if ( window.location.host == 'www.goozex.com' || window.location.host == 'goozex.com' )
			return "goozex";

		if ( window.location.host == 'www.bookmooch.com' || window.location.host == 'bookmooch.com' )
			return "bookmooch";

		if ( ( window.location.host == 'www.paypal.com' || window.location.host == 'paypal.com' ) &&
		     _XPathSearch( PAYPAL_SHIPPING_HEADER_SEARCH, document).snapshotLength > 0 )
			return "paypal";
	}

};


// ******************
// User config object
// ******************
SWP.Config =
{
	getShippingType : function()
	{
		var shippingType = '';
		shippingType = GM_getValue("defaultShippingType");
		return SHIPPING_TYPES[shippingType];
	},

	setShippingType : function(shippingType)
	{
		GM_setValue("defaultShippingType", shippingType.keyword);
	},

	getPackageType : function()
	{
		var packageType = '';
		packageType = GM_getValue("defaultPackageType");
		return PACKAGE_TYPES[packageType];
	},

	setPackageType : function(packageType)
	{
		GM_setValue("defaultPackageType", packageType.keyword);
	},

	getWeight : function()
	{
		var weight = {'lbs' : '', 'ozs' : ''};

		if ( GM_getValue("defaultWeightLBS") )
		{
			weight.lbs = GM_getValue("defaultWeightLBS");
			weight.ozs = GM_getValue("defaultWeightOZS");
		}
		else
		{
			weight.lbs = DEFAULT_PACKAGE_WEIGHT_LBS;
			weight.ozs = DEFAULT_PACKAGE_WEIGHT_OZS;
		}

		return weight;
	},

	setWeight : function(lbs, ozs)
	{
		GM_setValue("defaultWeightLBS", lbs);
		GM_setValue("defaultWeightOZS", ozs);
	}
};


// *********************
// User Interface object
// *********************
SWP.UI =
{
	createGoozexButton : function()
	{
		// grab reference to a DOM object near the address info
		var destinationLabelRef = _XPathSearch( GOOZ_DESTINATION_LABEL_SEARCH, document ).snapshotItem(0);

		// create the HTML code for the button
		var innerHTML = '<tbody><tr><td align="left" background="../ports/0/images/default/pushBgGreen.gif" width="9"><img src="../ports/0/images/default/pushSnGreen.gif" height="17" width="9"></td><td align="center" background="../ports/0/images/default/pushBgGreen.gif" nowrap="nowrap" valign="middle"><a id="greasemonkey_ship_with_paypal_link" href="javascript:void(null);" class="pushGreen">ship with paypal</a></td><td align="right" background="../ports/0/images/default/pushBgGreen.gif" width="9"><img src="../ports/0/images/default/pushDxGreen.gif" height="17" width="9"></td></tr></tbody>';

		// create a table element and set properties
		var tableElementRef = document.createElement('table');
		var widthAttrib = document.createAttribute('width');
		widthAttrib.nodeValue = 150;
		var borderAttrib = document.createAttribute('border');
		borderAttrib.nodeValue = 0;
		var cellSpacingAttrib = document.createAttribute('cellspacing');
		cellSpacingAttrib.nodeValue = 0;
		var cellPaddingAttrib = document.createAttribute('cellpadding');
		cellPaddingAttrib.nodeValue = 0;
		tableElementRef.setAttributeNode(widthAttrib);
		tableElementRef.setAttributeNode(borderAttrib);
		tableElementRef.setAttributeNode(cellSpacingAttrib);
		tableElementRef.setAttributeNode(cellPaddingAttrib);

		// insert the HTML code into the table
		tableElementRef.innerHTML = innerHTML;

		// using reference above, find the TD container and add table (which
		// is actually the button) into the TD, but right under the address
		currElem = destinationLabelRef;
		currElem = currElem.parentNode;
		currElem.insertBefore(tableElementRef, currElem.childNodes[5]);
		currElem.removeChild(currElem.childNodes[7]);

		// remove all shipping instructions
		var shippingInstructionsLabelRef = _XPathSearch( "//div[text()='Shipping instructions']", document ).snapshotItem(0);
		var shippingInstructParentRef = shippingInstructionsLabelRef.parentNode.parentNode;
		shippingInstructParentRef.parentNode.removeChild(shippingInstructParentRef);

		// add the click handler to the button
		var shippingLinkRef = document.getElementById('greasemonkey_ship_with_paypal_link');
		shippingLinkRef.addEventListener('click', SWP.UI.Handlers.scrapeGoozexAddress, false);
	},


	createBookMoochButtons : function()
	{
		// grab reference to the DOM object that contains unshipped books
		var unshippedBooksRef = _XPathSearch( MOOCH_BOOKS_TO_SEND_SEARCH, document );
		if ( unshippedBooksRef.snapshotLength == 0 ) return;

		var currElem = unshippedBooksRef.snapshotItem(0);
		while ( currElem.tagName.toLowerCase() != 'p')
		{
			currElem = currElem.parentNode;
		}

		// loop over all the tables contained within the unshipped books ref and add button
		var unshippedBooksTableRef = _XPathSearch( MOOCH_UNSHIPPED_BOOKS_TABLE_SEARCH, currElem );
		for ( bookIndex = 0; bookIndex < unshippedBooksTableRef.snapshotLength; bookIndex++ )
		{
			// find the place where we need to insert the new button
			var currTable = unshippedBooksTableRef.snapshotItem(bookIndex);
			var buttonContainerRef = _XPathSearch( MOOCH_BUTTON_CONTAINER_SEARCH, currTable ).snapshotItem(0);

			// create the HTML code for the button
			var innerHTML = '<tbody><tr><td bgcolor="#6eb0b1"><a href="javascript:void(null);" title="print usps label using paypal"><img bgcolor="#6EB0B1" src="http://images.bookmooch.com/images/button_template_left.gif" alt="" border="0" height="18" width="5"></a></td><td bgcolor="#6eb0b1" height="18" valign="middle"><a id="greasemonkey_ship_with_paypal_link_' + bookIndex + '" style="text-decoration: none;" href="javascript:void(null);" title="print usps label using paypal"><font color="#ffffff" face="Verdana, Arial, utopia, sans-serif" size="2"><nobr>SHIP WITH PAYPAL &gt;</nobr></font></a></td><td bgcolor="#6eb0b1"><a href="javascript:void(null);" title="print usps label using paypal"><img bgcolor="#6EB0B1" src="http://images.bookmooch.com/images/button_template_right.gif" alt="" border="0" height="18" width="6"></a></td></tr></tbody>';

			// create a table element and set properties
			var tableElementRef = document.createElement('table');
			var idAttrib = document.createAttribute('id');
			idAttrib.nodeValue = "button";
			var heightAttrib = document.createAttribute('height');
			heightAttrib.nodeValue = 18;
			var borderAttrib = document.createAttribute('border');
			borderAttrib.nodeValue = 0;
			var cellSpacingAttrib = document.createAttribute('cellspacing');
			cellSpacingAttrib.nodeValue = 0;
			var cellPaddingAttrib = document.createAttribute('cellpadding');
			cellPaddingAttrib.nodeValue = 0;
			tableElementRef.setAttributeNode(idAttrib);
			tableElementRef.setAttributeNode(heightAttrib);
			tableElementRef.setAttributeNode(borderAttrib);
			tableElementRef.setAttributeNode(cellSpacingAttrib);
			tableElementRef.setAttributeNode(cellPaddingAttrib);

			// insert the HTML code into the table
			tableElementRef.innerHTML = innerHTML;

			// using reference above, find the TD container and add table (which
			// is actually the button) into the TD
			var imgElementRef = document.createElement('img');
			var widthAttrib = document.createAttribute('width');
			widthAttrib.nodeValue = 1;
			heightAttrib = document.createAttribute('height');
			heightAttrib.nodeValue = 2;
			var srcAttrib = document.createAttribute('src');
			srcAttrib.nodeValue = "http://images.bookmooch.com/images/spacer.gif";
			imgElementRef.setAttributeNode(widthAttrib);
			imgElementRef.setAttributeNode(heightAttrib);
			imgElementRef.setAttributeNode(srcAttrib);

			buttonContainerRef.appendChild(imgElementRef);
			buttonContainerRef.appendChild(document.createElement('br'));
			buttonContainerRef.appendChild(tableElementRef);

			// add the click handler to the button
			var shippingLinkRef = document.getElementById('greasemonkey_ship_with_paypal_link_' + bookIndex);
			shippingLinkRef.addEventListener('click', SWP.UI.Handlers.scrapeBookMoochAddress, false);
		}

	},


	fillInPayPalShippingLabelInfo : function()
	{
		if ( GM_getValue('addressLastname') )
		{
			// set the address info
			_DEBUG("Filling in PayPal form");
			document.getElementById('first_name').value = GM_getValue('addressFirstname');
			document.getElementById('last_name').value = GM_getValue('addressLastname');
			document.getElementById('address1').value = GM_getValue('addressAddress');
			document.getElementById('address2').value = GM_getValue('addressAddress2');
			document.getElementById('city').value = GM_getValue('addressCity');
			document.getElementById('state').value = GM_getValue('addressState');
			document.getElementById('zip').value = GM_getValue('addressZip');

			// clear the stored information
			_DEBUG("Clearing GreaseMonkey stored data.");
			GM_setValue('addressFirstname', '');
			GM_setValue('addressLastname', '');
			GM_setValue('addressAddress', '');
			GM_setValue('addressAddress2', '');
			GM_setValue('addressCity', '');
			GM_setValue('addressState', '');
			GM_setValue('addressZip', '');

			// SET UP SOME HANDY DEFAULTS
			// start with setting rate class (1st class, priority, media mail, etc)
			var rateClassSelectRef = document.getElementById('rate_class');
			rateClassSelectRef.selectedIndex = 3;
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", true, true);
			rateClassSelectRef.dispatchEvent(evt);

			var packageSizeSelectRef = document.getElementById('myPkgSizeSelect');
			packageSizeSelectRef.selectedIndex = 1;
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", true, true);
			packageSizeSelectRef.dispatchEvent(evt);

			// now set the weight
			var weightLBSRef = _XPathSearch( WEIGHT_LBS_SEARCH, document ).snapshotItem(0);
			weightLBSRef.value = SWP.Config.getWeight().lbs;
			var weightOZSRef = _XPathSearch( WEIGHT_OZS_SEARCH, document ).snapshotItem(0);
			weightOZSRef.value = SWP.Config.getWeight().ozs;

		} // end if !empty( GM_getValue() )
	}
};


// *********************
// Event handlers for UI
// *********************
SWP.UI.Handlers =
{
	setDefaults : function()
	{
		alert('set defaults');
	},

	scrapeGoozexAddress : function(e)
	{
		// get all of the address elements and trim the whitespace
		var addressName = _XPathSearch( GOOZ_ADDRESS_NAME_LABEL_SEARCH, document ).snapshotItem(0).nodeValue.trim();
		_DEBUG('|'+addressName+'|');


		var addressAddressRef = _XPathSearch( GOOZ_ADDRESS_ADDRESS_LABEL_SEARCH, document );
		var addressAddress = _XPathSearch( GOOZ_ADDRESS_ADDRESS_LABEL_SEARCH, document ).snapshotItem(0).nodeValue.trim();
		if ( addressAddressRef.snapshotLength == 2 )
		{
			var addressAddress2 = "";
			var addressCityStateZip = _XPathSearch( GOOZ_ADDRESS_ADDRESS_LABEL_SEARCH, document ).snapshotItem(1).nodeValue.trim();
		}
		else if ( addressAddressRef.snapshotLength == 3 )
		{
			var addressAddress2 = _XPathSearch( GOOZ_ADDRESS_ADDRESS_LABEL_SEARCH, document ).snapshotItem(1).nodeValue.trim();
			var addressCityStateZip = _XPathSearch( GOOZ_ADDRESS_ADDRESS_LABEL_SEARCH, document ).snapshotItem(2).nodeValue.trim();
		}
		_DEBUG('|'+addressAddress+'|');
		_DEBUG('|'+addressCityStateZip+'|');
		var addressCountry = _XPathSearch( GOOZ_ADDRESS_COUNTRY_LABEL_SEARCH, document ).snapshotItem(0).nodeValue.trim();
		_DEBUG('|'+addressCountry+'|');


		// break the "address" element into address, city, state, and zip
		// I tried to use a simple regular expression here, but it just refused to work.
		// If you know why, feel free to let me know.
		// ORIGINAL, ELEGANT CODE BELOW
		// ============================
		//var matches = addressCityStateZip.match(CITY_STATE_ZIP_SPLIT_REGEXP);
		//var addressCity = matches[1];
		//var addressState = matches[2];
		//var addressZip = matches[3];
		// NEW, CRAPPY CODE BELOW
		// ============================
        var indexOfLastSpace = addressName.lastIndexOf(" ");
        var addressFirstname = addressName.substring(0, indexOfLastSpace);
        _DEBUG('|'+addressFirstname+'|');
        var addressLastname = addressName.substring(indexOfLastSpace + 1, addressName.length);
        _DEBUG('|'+addressLastname+'|');
        var indexOfComma = addressCityStateZip.indexOf(',');
		var addressCity = addressCityStateZip.substring(0,indexOfComma);
		_DEBUG('|'+addressCity+'|');
		var addressState = addressCityStateZip.substring(indexOfComma + 2, indexOfComma + 4);
		_DEBUG('|'+addressState+'|');
		var addressZip = addressCityStateZip.substring(indexOfComma + 5, addressCityStateZip.length);
		_DEBUG('|'+addressZip+'|');

		// store the address values
		GM_setValue('addressFirstname', addressFirstname);
		GM_setValue('addressLastname', addressLastname);
		GM_setValue('addressAddress', addressAddress);
		GM_setValue('addressAddress2', addressAddress2);
		GM_setValue('addressCity', addressCity);
		GM_setValue('addressState', addressState);
		GM_setValue('addressZip', addressZip);

		GM_openInTab(PAYPAL_SHIPPING_URL);
	},

	scrapeBookMoochAddress : function(e)
	{
		// get all of the address elements and trim the whitespace
		var currElem = e.target;
		while ( !( currElem.tagName.toLowerCase() == 'table' && currElem.id != 'button' ) )
		{
			currElem = currElem.parentNode;
		}
		var addressTdRef = _XPathSearch( MOOCH_ADDRESS_INFO_SEARCH, currElem ).snapshotItem(0);

		// split the address info into an array using the regexp
		var matches = addressTdRef.innerHTML.match( MOOCH_ADDRESS_SPLIT_REGEXP );
		var addressName = matches[0].replace('<br>', '');
		var addressAddress = matches[1].replace('<br>', '');
		if ( matches.length == 3 )
		{
			var addressAddress2 = '';
			var addressCityStateZip = matches[2];
		}
		else if ( matches.length == 4 )
		{
			var addressAddress2 = matches[2].replace('<br>', '');
			var addressCityStateZip = matches[3]
		}
		// get name which is the first line of the address info
        var indexOfLastSpace = addressName.lastIndexOf(" ");
        var addressFirstname = addressName.substring(0, indexOfLastSpace);
        _DEBUG('|'+addressFirstname+'|');
        var addressLastname = addressName.substring(indexOfLastSpace + 1, addressName.length);
        _DEBUG('|'+addressLastname+'|');
        // run a regexp search for the city, state and zip
        _DEBUG('|'+addressCityStateZip+'|');
		matches = addressCityStateZip.match( CITY_STATE_ZIP_SPLIT_REGEXP );
		addressCity = matches[1];
		addressState = matches[2];
		addressZip = matches[3];
		_DEBUG('|'+addressCity+'|');
		_DEBUG('|'+addressState+'|');
		_DEBUG('|'+addressZip+'|');


		// store the address values
		GM_setValue('addressFirstname', addressFirstname);
		GM_setValue('addressLastname', addressLastname);
		GM_setValue('addressAddress', addressAddress);
		GM_setValue('addressAddress2', addressAddress2);
		GM_setValue('addressCity', addressCity);
		GM_setValue('addressState', addressState);
		GM_setValue('addressZip', addressZip);

		GM_openInTab(PAYPAL_SHIPPING_URL);
	}

};




function _XPathSearch( xpathExpression, contextNode )
{
	if (!contextNode) contextNode = document;
	return document.evaluate(xpathExpression, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function _DEBUG( message )
{
	if ( SHOW_DEBUG )
		GM_log(message);
}


// Launch the program
SWP.init();

_DEBUG("End script");