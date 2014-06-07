// ==UserScript==
// @id             tom_free_news
// @name           timesofmalta_paywall
// @version        1.0.23.06.2013
// @namespace      *
// @author         @viziden
// @description    timesofmalta paywall disinfector
// @include        http*://*timesofmalta.com*
// @run-at         document-start
// @grant          unsafeWindow
// @grant          GM_log
// ==/UserScript==

//alert(document.location);

//TOM.userIsFreePaywalled = 0;
//TOM.userIsPremiumPaywalled = 1;
//TOM.userIsInternational = 0;
//TOM.contentIsPremium = 1;

var original = unsafeWindow.document.createElement.bind(unsafeWindow.document);
unsafeWindow.document.createElement = function (tag) {
  //GM_log(tag);
  if(tag == 'textarea') {
      if(typeof unsafeWindow.TOM.userIsPremiumPaywalled !== "undefined") {
        unsafeWindow.TOM.userIsPremiumPaywalled = 0;
        unsafeWindow.TOM.userIsFreePaywalled = 0;
        unsafeWindow.TOM.userIsInternational = 0;
    }
  }
  
  return original(tag);
};
