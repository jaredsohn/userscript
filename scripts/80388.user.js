// ==UserScript==
// @name          Facebook Highlight Birthdays
// @version       12
// @date          2009-11-17
// @description   Highlights today's birthdays on your home page.
// @namespace     
// @copyright     Copyright 2007-2009 Jackpot08
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/12813.js?maxage=5
// @include       http*://*.facebook.com/
// @include       http*://*.facebook.com/home.php*
// ==/UserScript==

// options
var highlightColor = '#fffe88';
var birthdays = 'birthdays'; // the word "birthdays" in your language (case-insensitive if your language does the whole cases thing)

// the actual code
var birthdayRegex = new RegExp("ref=hpbday.+>\s*" + birthdays + "\s*<\/span>\s*$", "i");
var birthdays = document.evaluate("//div[@class='UIUpcoming_Item']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = birthdays.snapshotLength - 1; i >= 0; i--) {
   if (birthdayRegex.test(birthdays.snapshotItem(i).innerHTML)) {
      birthdays.snapshotItem(i).setAttribute('style','font-weight: bold; background: ' + highlightColor);
   }
}