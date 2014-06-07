// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// Paypal packing slip link
// Sept 17, 2009
// Copyright (c) 2007-9, Nancy Walsh
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Paypal USPS Defaults", and click Uninstall.
//
// To configure this script, uncomment out the desired default rateClass and
//  pkgSize.  Set the originationZip to whatever your ship-from zip code is.
//  If all the packages you mail are the same size, let the weightPounds and
//  weightOunces variables to the proper values
//
//  Leaves all other elements at their default values.  Mailing Date of today,
//  Don't display postage, Don't purchase Insurance, etc.
//
//  Only changes the values on the standard ship-now URL, so that it doesn't try
//  to mod your changes if you got to the page by another method.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Paypal USPS Defaults
// @namespace     http://www.persistentknitter.com
// @description   Automatically select defaults in USPS create ashipping label page
// @include       https://www.paypal.com/us/cgi-bin/webscr?cmd=_ship-now*
// ==/UserScript==
/** HISTORY
 4 Nov 2007: Select focus in ounces field
 sometime between: Made greasekit compatible
 17 Sep 2009: Select date automatically

*/

var rateClass;
var pkgSize;
var originationZip;  // set this to a value if you want to use it

var weightPounds;
var weightOunces;
var tryDate;

// Possible values for rateClassSelection & pkgSize
// Uncomment only ONE of each and make sure the pkgSize you want is under the

// rateClass = 'PriorityMail';
//      pkgSize = 'PACKAGE_OR_FLAT_ENVELOPE';   // Package/Thick Envelope
//      pkgSize = 'FLAT_RATE_ENVELOPE'; // Flat Rate Envelope
//      pkgSize = 'FLAT_RATE_BOX';


// rateClass = 'ExpressMail';
//              pkgSize = 'PACKAGE_OR_FLAT_ENVELOPE'; // Package/Thick Envelope
//              pkgSize = 'LARGE_PACKAGE'; // Large Package
//              pkgSize = 'FLAT_RATE_ENVELOPE'; // Flat Rate Envelope


  rateClass = 'FirstClassMail';
       pkgSize = 'PACKAGE_OR_FLAT_ENVELOPE';   // Package/Thick Envelope
//              pkgSize = 'LARGE_PACKAGE';                              // Large Package


// rateClass = 'MediaMail';
//              pkgSize = 'PACKAGE_OR_FLAT_ENVELOPE'; // Package/Thick Envelope
//              pkgSize = 'LARGE_PACKAGE'; // Large Package

// rateClass = 'ParcelPost';
//              pkgSize = 'PACKAGE_OR_FLAT_ENVELOPE'; // Package/Thick Envelope
//              pkgSize = 'LARGE_PACKAGE';                              // Large Package
//              pkgSize = 'VERY_LARGE_PACKAGE'; // Very Large Package

// Comment this outif you don't want to try and set the date 
tryDate = 'Yup';

// Change this value if you want to change it to before/after 5pm
// This was tested in Pacific time - not sure if it'll change depending on time zone
//
var hourToSelectTomorrowAfter = 17;


////////////////////////////////////////////////////////////

if (rateClass != null) {
       // This finds the <select> html element
       var rateClassElement = document.getElementById('rate_class');

       if (rateClassElement != null)
       {
               // Select first class mail value
               rateClassElement.value = rateClass;

               // Fire event change so other drop down changes possible values
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent("change", true, true);
       rateClassElement.dispatchEvent(evt);

               if (pkgSize != null) {
                       // Find the next drop down to modify
                       var     pkgSizeElement = document.getElementById('myPkgSizeSelect');

                       // Force set the value we want
                       pkgSizeElement.value = pkgSize;

                       // fire event just in case anything else needs to change on the page
           var evt1 = document.createEvent("HTMLEvents");
           evt1.initEvent("change", true, true);
           pkgSizeElement.dispatchEvent(evt1);

               }
       }
}


var msecsInADay = 86400000;
if (tryDate != null) {
	var mailDateElem = document.getElementsByName("mailing_date");
	if (mailDateElem != null) {

		var now = new Date();
		if (now.getHours() >= hourToSelectTomorrowAfter) {
			
			var tomorrow = new Date(now.getTime() + msecsInADay);
			
			// whack the time off it; we only want the year, month and day to match paypal's formatting
			var tom2 = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
			
			var tom_string = '' + tom2.getTime();    // convert to a string
			
			// Now get rid of the final three zeroes
			var truncstring = tom_string.replace(/000$/g,"");
			
			// If you have problems with this not selecting correctly, uncomment this to debug.
			//	alert("Trying to select value: " + truncstring + " (Which is " + tom2 +")");
			mailDateElem[0].value = truncstring;		
		}
	}
}


if (originationZip != null) {
       var zip = document.getElementsByName('origination_zip');
       if (zip != null) {
               zip[0].value = originationZip;
               zip[0].wrappedJSObject.onfocus();
       }

}

if (weightPounds != null) {
       var pounds = document.getElementsByName("weight_lbs");
       pounds[0].value = weightPounds;
}

if (weightOunces != null) {
       var ozs = document.getElementsByName("weight_ozs");
       ozs[0].value = weightOunces;
}

// Request focus in the field that I use most when loading this form
var ozs = document.getElementsByName("weight_ozs");
ozs[0].focus();