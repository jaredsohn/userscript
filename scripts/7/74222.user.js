// ==UserScript==
// @name           Remove goals, FAQs and "Our Products" spam from NatWest Online Banking
// @namespace      http://www.calamityjames.co.uk/
// @include        https://www.nwolb.com/*
// ==/UserScript==
document.getElementById("TrackerPanel").style.display = "none";
document.getElementById("faqPanel").style.display = "none";
document.getElementById("ourProducts").style.display = "none";