// ==UserScript==
// @name        Redfin Links
// @author      patrick@feedface.com
// @version     2010-01-26
// @namespace   http://www.feedface.com/userscript/redfin_links
// @description Adds useful links below the "property description" on the Redfin details page.
// @include     http://www.redfin.com/*
// ==/UserScript==
// Compatible w/ GreaseKit (Safari)
//
// Changelog:
// * 2010-01-26:
//   - Support for forms ('POST')
// * 2009-11-23:
//	 - Initial release

/* Add your own links here. 
 *
 * The format for each entry is:
 * array( 'title',     -- Description
 *        true|false,  -- true: normal anchor, false: form (uses POST)
 *        'href' )     -- the URL ("http://...")
 *
 * Within the 'href' it is allowed to use placeholders. Each placeholder 
 * needs to be surrounded by two '@@'. 
 *
 * Known placeholders are:
 * - street         : The whole street address incl. no, unit and suffix
 * - street_no      : Street number
 * - street_name    : Name of the street w/o suffix
 * - street_suffix  : Street suffix (e.g. 'Ave')
 * - street_unit    : Unit number
 * - city           : City
 * - state          : US-state (e.g. 'MD')
 * - zip            : Zip-code
 * - mls            : MLS code
 */
var LINK_ENTRIES = new Array(
// Montgomery County Tax Report
new Array('MC Tax', true,
  'http://sdatcert3.resiusa.org/rp_rewrite/results.aspx?County=16'
    + '&SearchType=STREET&StreetNumber=@@street_no@@'
    + '&StreetName=@@street_name@@'),
// Montgomery County Public Schools
new Array('MC Schools', false,
  'http://gis.mcpsmd.org/gis/PublicLocator.asp?Agree=YES'
    + '&Address=@@street@@&Zipcode=@@zip@@'),
// Frederick County Tax Report
new Array('FC Tax', true,
  'http://sdatcert3.resiusa.org/rp_rewrite/results.aspx?County=11'
    + '&SearchType=STREET&StreetNumber=@@street_no@@'
    + '&StreetName=@@street_name@@')
);

// Returns the text of a 'span' tag which has a specific class 
function getSpanText(className) {
  var res = document.evaluate("//span[@class='" + className + "']",
              document, null,
              XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return res.singleNodeValue.innerHTML;
}

// Remove leading and pending whitespace
function trim(str) {
  var tl = str.replace(/^\s+/, '');
  return tl.replace(/\s+$/, '');
}

// Adds a single form to the document
function addForm(id, href) {
  var sp = href.split('?', 2);

  // Create a form
  var dform = document.createElement('form');
  dform.setAttribute('id', id);
  dform.setAttribute('action', sp[0]);
  dform.setAttribute('method', 'post');
  dform.setAttribute('target', '_blank');

  // Add each parameter as hidden
  var kpairs = sp[1].split('&');
  for (var i = 0; i < kpairs.length; i++) {
    var kv = kpairs[i].split('=', 2);
    if (kv.length == 2) {
      var e = document.createElement('input');
      e.setAttribute('type', 'hidden');
      e.setAttribute('name', kv[0]);
      e.setAttribute('value', kv[1]);
      dform.appendChild(e);
    }    
  }

  // Insert into the HTML
  document.body.appendChild(dform);
}

// Parses the DOM and returns the address
function extractAddress() {
  // Simple data
  var address = new Object();
  address['street'] = trim(getSpanText('street-address'));
  address['city']   = getSpanText('locality');
  address['state']  = getSpanText('region');
  address['zip']    = getSpanText('postal-code');
  
  // Split the street 
  var spStreet = address['street'].split(' ');
  address['street_no'] = spStreet.shift();

  var le = spStreet.pop();
  if (le[0] == '#') {
    address['street_unit']    = le.slice(1);
    address['street_suffix']  = spStreet.pop();
  } else {
    address['street_unit']    = '';
    address['street_suffix']  = le;
  }

  address['street_name'] = spStreet.join(' ');

  // MLS number
  address['mls'] = trim(document.getElementById('mls_id').innerHTML);

  return address;
}

// Add the links to the document
function addLinks() {
  // There is a property desc. - so we are on the details page
  var pdesc = document.getElementById('property_description');
  if (pdesc != null) {
    var address = extractAddress();

    // Create the links, i.e. HTML code
    var linksHTML = '';
    for (var leIdx = 0; leIdx < LINK_ENTRIES.length; leIdx++) {
      // Replace all the place holders
      var href = LINK_ENTRIES[leIdx][2];
      for (var name in address) {
        href = href.replace('@@' + name + '@@', address[name]);
      }

      // Normal (GET)
      if (LINK_ENTRIES[leIdx][1]) {
        linksHTML += '<b>[<a href="' + encodeURI(href) + '" target="_blank">'
                     + LINK_ENTRIES[leIdx][0] + '</a>]</b> ';
      
      // Requires a form (POST)
      } else {
        var formId = 'rfl_form_' + leIdx;
        addForm(formId, href);
        linksHTML += '<b>[<a href="javascript:document.getElementById(\'' 
                      + formId + '\').submit();">' + LINK_ENTRIES[leIdx][0] 
                      + '</a>]</b> ';
      }

      // Append the link
    }
    
    // Add the links
    var ldiv = document.createElement('div');
    ldiv.style.background = '#FFFBDD';
    ldiv.style.margin = '1em';
    ldiv.innerHTML = linksHTML;
    pdesc.parentNode.insertBefore(ldiv, pdesc.nextSibling);
  }
}

// State code
if (window.location.pathname.search(/^\/[A-Z]{2}\//) == 0) {
  addLinks();
}

