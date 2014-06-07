// ==UserScript==
// @name           Tikka Tikka
// @author         
// @version        0.1
// @namespace      
// @description    just a test
// @include        *facebook.com*
// ==/UserScript==

var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[@id='announce'] | //div[contains(@id, 'sponsor')] | //div[contains(@id, 'ssponsor')] | //div[contains(@class, 'invite')] | //div[contains(@id, 'gift')] | //div[contains(@id, 'sponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

window.addEventListener("load", function(e) {
  var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[@id='announce'] | //div[contains(@id, 'sponsor')] | //div[contains(@id, 'ssponsor')] //div[contains(@class, 'sidebar_item sponsor')] //div[contains(@class, 'emu_ad')] //div[contains(@class, 'profile_sidebar_ads')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) {
    var thisElement = elements.snapshotItem(i);
    thisElement.parentNode.removeChild(thisElement);
  }
}, false);
