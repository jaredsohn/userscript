// ==UserScript==
// @name        MRIS ZipRealty
// @author      patrick@feedface.com
// @version     2009-11-18
// @namespace   http://www.feedface.com/userscript/mris_ziprealty
// @description Appends a ZipRealty link to each MRIS 'code'
// @include     http://mrislistings.mris.com/Matrix/Public/Portal.aspx?*
// ==/UserScript==
// Compatible w/ GreaseKit (Safari)

/*
 * The county code - replace if needed
 */
var COUNTY_CODE     = 'MC';

/*
 * Length of the code - change if necessary
 * A range could be specified like this: 'min,max'
 */
var CODE_LENGTH     = 7;

/*
 * ZIP Realty HREF - change if necessary 
 */
var ZIP_REALTY_HREF = 'http://www.ziprealty.com/buy_a_home/logged_in/search/home_detail.jsp?source=MRIS&listing_num=';

// Get the whole body
var html = document.body.innerHTML;

// Regexp to capture the code
var re = new RegExp('(' + COUNTY_CODE + '\\d{' + CODE_LENGTH + '})', 'g');

// Insert the link - not 100% valid HTML code - but renders fine
html = html.replace(re, '<a href="' + ZIP_REALTY_HREF 
                      + '$1" target="_blank">ZR</a>|$1');

// Replace the original body
document.body.innerHTML = html;

