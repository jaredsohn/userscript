// ==UserScript==
// @name        MRIS Redfin
// @author      patrick@feedface.com
// @version     2010-01-28
// @namespace   http://www.feedface.com/userscript/mris_redfin
// @description Appends a Redfin link to each MRIS 'code'
// @include     http://mrislistings.mris.com/Matrix/Public/Portal.aspx?*
// ==/UserScript==
// Compatible w/ GreaseKit (Safari)
//
// 2010-01-28:
// - Multiple county codes
// 2009-11-18:
// - Initial release

/*
 * The county codes - replace if needed
 */
var COUNTY_CODES = new Array('MC', 'FR');

/*
 * Length of the code - change if necessary
 * A range could be specified like this: 'min,max'
 */
var CODE_LENGTH     = 7;

/*
 * ZIP Realty HREF - change if necessary 
 */
var REDFIN_HREF = 'http://www.redfin.com/search#market=dc&search_location='

// Get the whole body
var html = document.body.innerHTML;

// For each county
for (var i = 0; i < COUNTY_CODES.length; i++) {
  // Regexp to capture the code
  var re = new RegExp('(' + COUNTY_CODES[i] + '\\d{' + CODE_LENGTH + '})', 'g');

  // Insert the link - not 100% valid HTML code - but renders fine
  html = html.replace(re, '<a href="' + REDFIN_HREF 
                        + '$1" target="_blank">RF</a>|$1');
}

// Replace the original body
document.body.innerHTML = html;

