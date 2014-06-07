// ==UserScript==
// @name           nix white space
// @namespace      chrysalides
// @description    Attack White Space
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// @include        http://www.geocaching.com/seek/cdpf.aspx?*
// ==/UserScript==

// thanks to Lil Devil and Avernar for coding tips

var elem;

// remove white space at "Print"

elem = document.evaluate("//span[@id='ctl00_ContentBody_uxPrintHeader']/../br",  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if(elem.singleNodeValue) elem.singleNodeValue.style.display = "none";

// remove ROT13 encryption key

elem = document.getElementById("ctl00_ContentBody_EncryptionKey");
if (elem) elem.style.display = "none";

// remove unnecessary line break

elem = document.evaluate("//div[@id='yui-g']/table/tbody/tr/td/br", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if(elem.singleNodeValue) elem.singleNodeValue.style.display = "none";

elem = document.getElementById("ctl00_ContentBody_lnkConversions");

if (elem) elem = elem.parentNode;
if (elem) {
    utm = document.getElementById("ctl00_ContentBody_LocationSubPanel");
    if (utm) utm.insertBefore(elem, utm.childNodes[1]);
}

// remove Facebook iframe

// GM_addStyle('iframe[src*="facebook"] { display:none; }');

// remove L&F banner

GM_addStyle('div[class*="LFNominateBanner"] { display:none; }');

// disclaimer in cache page

GM_addStyle('table[class*="CacheDisclaimerTable"] { display:none; }');

// remove disclaimer from print page

GM_addStyle('div[class="TermsWidget"] { display:none; }');
