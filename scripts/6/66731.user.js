// ==UserScript==
// @name        ZipRealty Links
// @author      patrick@feedface.com
// @version     2009-11-18
// @namespace   http://www.feedface.com/userscript/ziprealty_links
// @description Adds useful links below the "action buttons" on the ZipRealty details page.
// @include     http://www.ziprealty.com/buy_a_home/logged_in/search/home_detail.jsp?*
// ==/UserScript==
// Compatible w/ GreaseKit (Safari)

/* Add your own links here. Each placeholder needs to be surrounded by two
 * '@@'. The first entry is the label, and the second one the href.
 *
 * Known placeholders are:
 * - street         : The whole street address incl. no, unit and suffix
 * - street_no      : Street number
 * - street_name    : Name of the street w/o suffix
 * - street_suffix  : Street suffix (e.g. 'Ave')
 * - street_unit    : Unit number
 * - city           : City
 * - zip            : Zip-code
 */
var LINK_ENTRIES = new Array(
  // Montgomery County Tax Report
  new Array('Tax Report',
    'http://sdatcert3.resiusa.org/rp_rewrite/results.aspx?County=16'
      + '&SearchType=STREET&StreetNumber=@@street_no@@'
      + '&StreetName=@@street_name@@'),
  // Redfin D.C.
  new Array('Redfin',
    'http://www.redfin.com/search#search_location=@@street@@,@@city@@'
      + '&market=dc')
);

/*
 * Change this XPaths in case the script stops working due to a layout change.
 */
// XPath pointing to the header which contains the whole address
var HEADER_XPATH  = '/html/body/div/div/div[3]/table[2]/tbody/tr/td/table/tbody/tr/td/h1';
// XPath pointing to the div tag with the action buttons (e.g. "Request showing")
var ACTIONS_XPATH = '/html/body/div/div/div[3]/div[2]/table/tbody/tr/td/div';

// Creates an assoc. array containing the whole address
function extractAddress() {
  // Get the whole address
  var headerXPathRes  = document.evaluate(HEADER_XPATH, document, null, 
                                  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var headerValue = headerXPathRes.singleNodeValue.innerHTML;
  var headerParts = headerValue.split(',');

  // Store everything in an assoc. array
  var address = new Object();
  
  // Street
  address['street'] = headerParts[0];
  var streetParts = address['street'].split(' '); 
  address['street_no'] = streetParts.shift();
  var suffix = streetParts.pop(); // Maybe a suffix, e.g. Ave

  // Maybe a unit number
  if (suffix[0] == '#') {
    address['street_unit']    = suffix.slice(1);
    address['street_suffix']  = streetParts.pop();
  } else {
    address['street_unit']    = '';
    address['street_suffix']  = suffix;
  }
  address['street_name']    = streetParts.join(' ');

  // City
  address['city'] = headerParts[1].slice(1);
  
  // Zip code - remove the stars
  var zip = headerParts[2].slice(3); // Remove the state code
  var starPos = zip.indexOf('*');
  address['zip'] = (starPos == -1) ? zip : zip.slice(0, starPos);

  return address;
}

// Add the links to the action 'div'
function addLinks() {
  // Extract the address
  var address = extractAddress();

  // Get the dest. div
  var actionsXPathRes = document.evaluate(ACTIONS_XPATH, document, null,
                                   XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var actionsElement  = actionsXPathRes.singleNodeValue;

  // Create the links, i.e. HTML code
  var linksHTML = '';
  for (var leIdx = 0; leIdx < LINK_ENTRIES.length; leIdx++) {
    // Replace all the place holders
    var href = LINK_ENTRIES[leIdx][1];
    for (var name in address) {
      href = href.replace('@@' + name + '@@', address[name]);
    }

    // Append the link
    linksHTML += '<b>[<a href="' + encodeURI(href) + '" target="_blank">'
                 + LINK_ENTRIES[leIdx][0] + '</a>]</b> ';
  }

  // Add to the dest. div
  var linksDiv  = document.createElement('div');
  linksDiv.innerHTML = linksHTML;
  actionsElement.appendChild(linksDiv);
}

// main()
addLinks();

