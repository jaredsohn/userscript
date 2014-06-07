// ==UserScript==
// @name           Twitter Refresher
// @namespace      http://examancer.com/userscripts/
// @description    Simple Twitter refresher
//                 Checks to see if any text has been entered into
//                 the twitter input, if not the page is reloaded.
// @include        http://twitter.com/*
// @inlcude        http*://twitter.com/*
// ==/UserScript==

// SET THE DELAY IN SECONDS HERE.

REFRESHER_DELAY = 10;

// USE DECIMALS FOR PARTIAL SECONDS

window.setTimeout(
  function() {
    status = document.getElementById("status");
    if (status && status.value == "") {
      window.location.reload();
    }
  }
, REFRESHER_DELAY * 1000 );

