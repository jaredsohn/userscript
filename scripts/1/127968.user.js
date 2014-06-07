// ==UserScript==
// @name        RealEstateLinks
// @description Make links on popular real estate sites open in a new tab.
// @match       http://www.zillow.com/homes/*
// @match       http://www.realtor.com/realestateandhomes-search/*
// @match       http://www.trulia.com/for_sale/*
// @version     0.1
// ==/UserScript==

// Find or create <base> element in the page and set the target attribute to "_blank".
// This makes links open in a new tab in most browsers.
var base;
if (document.getElementsByTagName('BASE').length > 0) {
  base = documents.getElementsByTagName('BASE')[0];
} else {
  base = document.createElement('BASE');
  document.getElementsByTagName('HEAD')[0].appendChild(base);
}
base.target = '_blank';