// ==UserScript==
// @name ContextualAdBlock 0.1.1
// @namespace http://matthewosh.googlepages.com/
// @description Blocks Contextual Ads on Google Searches - for now more of a proof of concept, but future updates will hopefully add neater blocking, links to 'try search on...', ad blocking on Gmail and other Google Services, and possibly ad blocking on any page with Google Ads.
// @include http://www.google.com/*
// ==/UserScript==

// ------------------------------

// Contextual AdBlock  0.1
// By Matthew O'Shaughnessy

// ------------------------------

document.getElementById('mbEnd').innerHTML = '';  //Hide Sidebar Ads (Id mbEnd)
document.getElementById('tpa1').innerHTML = '';   //Hide Top Ads If Present (Id tpa1)