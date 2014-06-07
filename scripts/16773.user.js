// Copyright 2007 Ryan Hagan <ryan@ryanhagan.net>.
// All rights Reserved.
//
//
// RELEASE NOTES
// =============
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
// @name           Goozex - Ship with PayPal
// @namespace      ryanhagan.net
// @description    Creates a button on the Goozex shipping page that automatically launches the PayPal shipping link
// @include        http://www.goozex.com/trading/asp/offeracceptok.asp?id=*
// @include        http://goozex.com/trading/asp/offeracceptok.asp?id=*
// @include        https://www.paypal.com/us/cgi-bin/webscr?*
// ==/UserScript==


// OBJECT EXTENSIONS
String.prototype.trim = function() { 
	return this.replace(/^\s+|\s+$/gmi, ''); 
};



var SHOW_DEBUG = false;

_DEBUG("Begin script");


var PAYPAL_SHIPPING_URL = "https://www.paypal.com/us/cgi-bin/webscr?cmd=_ship-now";


var DESTINATION_LABEL_SEARCH = "//b[text()='Destination address:']";
var ADDRESS_NAME_LABEL_SEARCH = "//tr/td[text()='name:']/parent::tr/td[2]/span/text()";
var ADDRESS_ADDRESS_LABEL_SEARCH = "//tr/td[text()='address:']/parent::tr/td[2]/span/text()";
var ADDRESS_COUNTRY_LABEL_SEARCH = "//tr/td[text()='country:']/parent::tr/td[2]/span/text()";

var PAYPAL_SHIPPING_HEADER_SEARCH = "//h1[text()='U.S. Postal Service - Create Your Shipping Label']";
var WEIGHT_LBS_SEARCH = "//span[@id='WeightField']/input[@name='weight_lbs']";
var WEIGHT_OZS_SEARCH = "//span[@id='WeightField']/input[@name='weight_ozs']";


var CITY_STATE_ZIP_SPLIT_REGEXP = /^([\w]+?), (\w\w) (\d\d\d\d\d)$/;


var SHIPPING_TYPES = {
	"Priority" : { "index" : 1, "keyword" : "Priority", "desc" : "Priority Mail" },
	"Express" : { "index" : 2, "keyword" : "Express", "desc" : "Express Mail" },
	"FirstClass" : { "index" : 3, "keyword" : "FirstClass", "desc" : "First-Class Mail" },
	"Media" : { "index" : 4, "keyword" : "Media", "desc" : "Media Mail" },
	"Parcel" : { "index" : 5, "keyword" : "Parcel", "desc" : "Parcel Post" }
}
var DEFAULT_SHIPPING_TYPE = "FirstClass";

var PACKAGE_TYPES = {
	"Envelope" : { "index" : 1, "keyword" : "Envelope", "desc" : "Package/Thick Envelope" },
	"Package" : { "index" : 2, "keyword" : "Package", "desc" : "Large Package" },
	"Box" : { "index" : 3, "keyword" : "Box", "desc" : "Flat Rate Box (Priority Mail only)" }
}
var DEFAULT_PACKAGE_TYPE = "Envelope";

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
		this.version = "1.1.1";
		this.scriptname = "goozexshipwithpaypal.user.js";

		// register menu items
		GM_registerMenuCommand( "Default Shipping Method", SWP.UI.Handlers.setDefaultShippingMethod, "m", "control alt","m" );
		GM_registerMenuCommand( "Default Package Size", SWP.UI.Handlers.setDefaultPackageSize, "s", "control alt", "s" );
		GM_registerMenuCommand( "Default Weight", SWP.UI.Handlers.setDefaultWeight, "w", "control alt", "w" );

		// begin setup program
		var currentLocation = this._determineLocation();
		switch( currentLocation )
		{	
			case "goozex" :
				// wait for page to load and then create the button
				window.addEventListener('load', SWP.UI.createGoozexButton, true);
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

		if ( GM_getValue("defaultShippingType") )
			shippingType = GM_getValue("defaultShippingType");
		else
			shippingType = DEFAULT_SHIPPING_TYPE;

		return SHIPPING_TYPES[shippingType];
	},

	setShippingType : function(shippingType)
	{
		GM_setValue("defaultShippingType", shippingType.keyword);
	},

	getPackageType : function()
	{
		var packageType = '';

		if ( GM_getValue("defaultPackageType") )
			packageType = GM_getValue("defaultPackageType");
		else
			packageType = DEFAULT_PACKAGE_TYPE;

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
		var destinationLabelRef = _XPathSearch( DESTINATION_LABEL_SEARCH, document ).snapshotItem(0);

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
		while ( currElem.tagName.toLowerCase() != 'td')
		{
			currElem = currElem.parentNode;
		}
		currElem.insertBefore(tableElementRef, currElem.lastChild);
		currElem.insertBefore(document.createElement('br'), currElem.lastChild);

		// add the click handler to the button
		var shippingLinkRef = document.getElementById('greasemonkey_ship_with_paypal_link');
		shippingLinkRef.addEventListener('click', SWP.UI.Handlers.scrapeGoozexAddress, false);
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
			document.getElementById('city').value = GM_getValue('addressCity');
			document.getElementById('state').value = GM_getValue('addressState');
			document.getElementById('zip').value = GM_getValue('addressZip');

			// clear the stored information
			_DEBUG("Clearing GreaseMonkey stored data.");
			GM_setValue('addressFirstname', '');
			GM_setValue('addressLastname', '');
			GM_setValue('addressAddress', '');
			GM_setValue('addressCity', '');
			GM_setValue('addressState', '');
			GM_setValue('addressZip', '');

			// SET UP SOME HANDY DEFAULTS
			// start with setting rate class (1st class, priority, media mail, etc)
			var rateClassSelectRef = document.getElementById('rate_class');
			rateClassSelectRef.selectedIndex = SWP.Config.getShippingType().index;
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", true, true);
			rateClassSelectRef.dispatchEvent(evt);

			switch( SWP.Config.getShippingType().keyword )
			{
				case 'FirstClass' : 
				case 'Media' : 
				case 'Priority' : 
					var packageSizeSelectRef = document.getElementById('myPkgSizeSelect');
					packageSizeSelectRef.selectedIndex = SWP.Config.getPackageType().index;
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", true, true);
					packageSizeSelectRef.dispatchEvent(evt);

					// now set the weight
					var weightLBSRef = _XPathSearch( WEIGHT_LBS_SEARCH, document ).snapshotItem(0);
					weightLBSRef.value = SWP.Config.getWeight().lbs;
					var weightOZSRef = _XPathSearch( WEIGHT_OZS_SEARCH, document ).snapshotItem(0);
					weightOZSRef.value = SWP.Config.getWeight().ozs;
					break;
			} // end switch
		} // end if !empty( GM_getValue() )
	}
};


// *********************
// Event handlers for UI
// *********************
SWP.UI.Handlers = 
{
	// menu item handlers
	setDefaultShippingMethod : function() 
	{
		alert('shippingMethod'); 
	},

	setDefaultPackageSize : function() 
	{ 
		alert('package size'); 
	},

	setDefaultWeight : function() 
	{ 
		alert('weight'); 
	},

	scrapeGoozexAddress : function()
	{
		// get all of the address elements and trim the whitespace
		var addressName = _XPathSearch( ADDRESS_NAME_LABEL_SEARCH, document ).snapshotItem(0).nodeValue.trim();
		_DEBUG('|'+addressName+'|');
		var addressAddress = _XPathSearch( ADDRESS_ADDRESS_LABEL_SEARCH, document ).snapshotItem(0).nodeValue.trim();
		_DEBUG('|'+addressAddress+'|');
		var addressCityStateZip = _XPathSearch( ADDRESS_ADDRESS_LABEL_SEARCH, document ).snapshotItem(1).nodeValue.trim();
		_DEBUG('|'+addressCityStateZip+'|');
		var addressCountry = _XPathSearch( ADDRESS_COUNTRY_LABEL_SEARCH, document ).snapshotItem(0).nodeValue.trim();
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