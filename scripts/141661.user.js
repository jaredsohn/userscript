// ==UserScript==
// @name          Hot date!
// @namespace     2222.2P.com/userscripts
// @description	  Pins a site down to prevent data entry loss
// @include *
// ==/UserScript==
// Notes: pin difficult interfaces down to the page while you conduct data entry. [Common javascript tools]


var warning = true;
window.onbeforeunload = function() { 
  if (warning) {
    return "It's going!";
  }
}

