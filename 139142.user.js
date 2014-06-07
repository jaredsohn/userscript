// ==UserScript==
// @name        Magento USPS Click-N-Ship
// @namespace   http://userscripts.org/users/478017
// @description Autofill USPS Click-N-Ship form from Magento order page.  Credit to Bob Igo ( bob@mythic.tv ) who I heavily used chunks and modified code from (his script no longer worked with current versions of Magento or USPS).
// @include     *sales_order/view/order_id*
// @author        Jason Harbert ( jason.harbert@gmail.com ) / Bob Igo ( bob@mythic.tv ) 
// @homepage      http://www.jasonharbert.com
// @version     1
// ==/UserScript==

/*
  This top section accomplishes the Greasemonkey/jQuery merging.
  See http://joanpiedra.com/jquery/greasemonkey/ for Joan Piedra's core GM/jQuery merge code.
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
	window.setTimeout(GM_wait,100);
    } else {
	$ = unsafeWindow.jQuery;
	clickNShip(); // call the main function of magento_usps_ship
    }
}
GM_wait();


/*
  Main script begins here
*/

// Stores a mapping between the official US state or territory name and the official two-character
// USPS-recognized abbreviation.
var stateAndTerritoryHash = {
    "Alabama":"AL", "Alaska":"AK", "American Samoa":"AS", "Arizona":"AZ", "Arkansas":"AR",
    "California":"CA", "Colorado":"CO", "Connecticut":"CT", "Delaware":"DE", "District of Columbia":"DC",
    "Federated States of Micronesia":"FM", "Florida":"FL", "Georgia":"GA", "Guam":"GU", "Hawaii":"HI",
    "Idaho":"ID", "Illinois":"IL", "Indiana":"IN", "Iowa":"IA", "Kansas":"KS",
    "Kentucky":"KY", "Louisiana":"LA", "Maine":"ME", "Marshall Islands":"MH", "Maryland":"MD",
    "Massachusetts":"MA", "Michigan":"MI", "Minnesota":"MN", "Mississippi":"MS", "Missouri":"MO",
    "Montana":"MT", "Nebraska":"NE", "Nevada":"NV", "New Hampshire":"NH", "New Jersey":"NJ",
    "New Mexico":"NM", "New York":"NY", "North Carolina":"NC", "North Dakota":"ND", "Northern Mariana Islands":"MP",
    "Ohio":"OH", "Oklahoma":"OK", "Oregon":"OR", "Palau":"PW", "Pennsylvania":"PA",
    "Puerto Rico":"PR", "Rhode Island":"RI", "South Carolina":"SC", "South Dakota":"SD", "Tennessee":"TN",
    "Texas":"TX", "Utah":"UT", "Vermont":"VT", "Virgin Islands":"VI", "Virginia":"VA",
    "Washington":"WA", "West Virginia":"WV", "Wisconsin":"WI", "Wyoming":"WY"};

// For a full state name, return the uppercase standard two-letter USPS state abbreviation.
function getStateAbbreviation(state) {
    return stateAndTerritoryHash[state];
}

// Returns the email address of the package's recipient.
function getReceiverEmailAddress() {
    return $(".box-right a[href*=mailto:]").text();
}

// Returns the raw text of the shipping address.
function getRawAddress() {
    raw = null;
    // Extract shipping address, clean it up, get state abbreviation, send it to Click-n-Ship
    $(".box-right address").each(function(i) {  // suboptimal; I really just want to return the first (and only) match, but this works for now
	    raw = $(this).text();
	});
    return raw;
}

// Main function, including Greasemonkey function invocations.
function clickNShip() {

    var deliveryCountry=""; // the USPS numeric ID for the delivery country
    var postalCodeName=""; // the country-specific name for postal code or zip code
    var stateName=""; // the country-specific name for a state or province, as required by Click-n-Ship
    var state=""; // depending on country, either full state/province name, or an abbreviation
    
    // Extract email address
    emailAddress = getReceiverEmailAddress();

    unprocessedAddress = getRawAddress();
    /* Here's the deal: Magento's order shipping page doesn't mark up address fields one
       bit, so we have to make assumptions about which line corresponds to which address
       field.  Here is the current order for US addresses:
       
       00: BLANK
       01: Full Name
       02: Company Name
       03: Address 1
       04: Address 2
       05: BLANK
       06: BLANK
       07: City, State, Zipcode
       08: Country
       09: Telephone
       10: Cust Service #
    */

    // Put all lines into an array.
    addressLines = [''].concat(unprocessedAddress.split("\n"));  // Magento versions after 1.4 or so don't have an empty first row.  Adding to keep code the same.

    // Extract country
    country = addressLines[8].replace(/^\s*|\s*$/g,'');
    cityStateZip = addressLines[7].split(", ");

    // Make sure the country is supported, and if so, set the deliveryCountry code.
    if (country == "United States") {
	deliveryCountry = "1";
	postalCodeName = "Zipcode";
	stateName = "deliveryState";
	state = getStateAbbreviation(cityStateZip[1].replace(/^\s*|\s*$/g,''));

    } else if (country == "Canada") {
	deliveryCountry = "10054";
	postalCodeName = "PostalCode";
	stateName = "province";
	state = cityStateZip[1].replace(/^\s*|\s*$/g,'');

	alert("Shipping to Canada is untested.  Let me know if it works: bob@mythic.tv")

    } else {
	alert("Shipping to " + country + " is not yet supported by magento_usps_ship.");
    }
    
    // Extract the remaining address lines, remove extraneous spaces, and convert any remaining spaces
    // in relevant fields to %20 for URL friendliness.
    
    fullName        = addressLines[1].split(" ");
    var firstName   = fullName.shift();
    var lastName    = fullName.join(" ");
    
    firstName = firstName.replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    lastName  = lastName.replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    companyName = addressLines[2].replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    addressOne  = addressLines[3].replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    addressTwo  = addressLines[4].replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    
    city    = cityStateZip[0].replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    zipcode = cityStateZip[2].replace(/^\s*|\s*$/g,'').replace(/\s/g,'%20');
    
    // Tell Greasemonkey to open a new tab with a secure Click-n-Ship URL using all our shipping info.
    GM_openInTab("https://cns.usps.com/go/Secure/LabelInformationAction!input.action?deliveryCountry=" + deliveryCountry + 
                 "&form.deliveryFirstName=" + firstName +
		 "&form.deliveryLastName=" + lastName +
		 "&form.deliveryCompanyName=" + companyName +
		 "&form.deliveryAddressOne=" + addressOne +
		 "&form.deliveryAddressTwo=" + addressTwo +
		 "&form.deliveryCity=" + city +
		 "&form." + stateName + "=" + state +
		 "&form.delivery" + postalCodeName + "=" + zipcode);
		// "&form.deliveryEmail=" + emailAddress
		// "&form.emailNotification=true&shipFromZipCode=same");
    
}