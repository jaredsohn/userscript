// ==UserScript==
// @name        Testing
// @match       https://*.zendesk.com/*
// ==/UserScript==

   var paying;
   if(currentAccount) {
      if(currentAccount.isPayingCustomer) {
         paying = "yes";
      } else {
         paying = "no";
      }
   } else {
      paying = "unknown";
   }
   window.alert("paying:" + paying);
