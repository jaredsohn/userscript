// ==UserScript==
// @name           Improve "Amazon Prime" indicator
// @namespace      http://spazquest.org/dev/greasemonkey/
// @description    hide Amazon Prime stripe if product is ineligible
// @include        http://*.amazon.*/dp/*
// @include        https://*.amazon.*/dp/*
// @author         Eric True
// @version        0.9
// ==/UserScript==


var memberStripe = document.getElementById('memberStripe');
var notEligibleString = 'Not eligible for Amazon Prime';

if (memberStripe) {
  if (memberStripe.innerHTML.indexOf(notEligibleString) != -1) {
    // replace logo & other indicators with plain message
    memberStripe.style.backgroundImage = 'none';
    memberStripe.style.color = 'red';
    memberStripe.style.textAlign = 'center';
    memberStripe.innerHTML = notEligibleString; 
  }
}
