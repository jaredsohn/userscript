// ==UserScript==

// @name           NYTimes Remove Flash Ads
// @namespace      http://www.3greeneggs.com
// @description    Remove the hideous, irritating Flash ad from nytimes pages
// @include        *nytimes.com*

// ==/UserScript==

var flashad = document.getElementById('adxBigAd');
if (flashad) {
    flashad.parentNode.removeChild(flashad);
}
