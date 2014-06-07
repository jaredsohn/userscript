// ==UserScript==
// @name          Facebook Highlight Birthdays
// @description   Highlights today's birthdays on your home page.
// @include       https://*.facebook.com/*
// @include       https://*.facebook.com/*
// @exclude       https://*.facebook.com/ajax/*
// @exclude       https://*.facebook.com/ajax/*
// ==/UserScript==

// option
var highlightColor = '#fffe88';

// the actual code
function findBdays(event) {
   var birthdays = document.evaluate("//div[@class='UIImageBlock clearfix']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (i = birthdays.snapshotLength - 1; i >= 0; i--) {
      if (birthdays.snapshotItem(i).innerHTML.indexOf('hpbday') >= 0) {
         birthdays.snapshotItem(i).setAttribute('style','background: ' + highlightColor);
         birthdays.snapshotItem(i).childNodes[1].setAttribute('style','font-weight: bold; background: ' + highlightColor);
         document.removeEventListener('DOMNodeInserted', findBdays, true); // we need to remove the event listener or we might cause an infinite loop apparently
         break;
      }
   }
}

if (top.location == location && /\.facebook\.com$/i.test(location.hostname)) {
   document.addEventListener('DOMNodeInserted', findBdays, true);
}