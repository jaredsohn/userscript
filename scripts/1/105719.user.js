// ==UserScript==
// @name           GC Listing Cleaner
// @namespace      dema(sk), http://userscripts.org/users/354446
// @description    Remove uselessness from geocache listing
// @include        http://www.geocaching.com/*
// @version        1.4
// ==/UserScript==

var elem;

// remove ROT13 encryption key

elem = document.getElementById("ctl00_ContentBody_EncryptionKey");
if (elem) elem.style.display = "none";

// disclaimer in geocache page

GM_addStyle('fieldset[class="DisclaimerWidget"] { display:none; }');

// remove Advertising with Us

GM_addStyle('div[class="CacheDetailPageAds clear"] { display:none; }');

GM_addStyle('div[class="MasterPageAds"] { display:none; }');

elem = document.getElementById("ctl00_ContentBody_divContentSide");
if (elem) elem.style.display = "none";

// social icons in geocache page

// elem = document.getElementById("ctl00_hlFacebook");
// if (elem) elem.style.display = "none";

// elem = document.getElementById("ctl00_hlTwitter");
// if (elem) elem.style.display = "none";

// elem = document.getElementById("ctl00_hlFlickr");
// if (elem) elem.style.display = "none";

// elem = document.getElementById("ctl00_hlYouTube");
// if (elem) elem.style.display = "none";

// remove premium

elem = document.getElementById("hlUpgrade");
if (elem) elem.style.display = "none";