// ==UserScript==
// @name          Facebook Highlight Birthdays
// @version       12
// @date          2009-11-17
// @description   Highlights today's birthdays on your home page.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2007-2009 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/12813.js?maxage=5
// @include       http*://*.facebook.com/
// @include       http*://*.facebook.com/home.php*
// ==/UserScript==

// options
var highlightColor = '#fffe88';
var today = 'Aujourd'hui'; // the word "today" in your language (case-insensitive if your language does the whole cases thing)

// the actual code
var AnniversaireRegex = new RegExp("ref=hpbday.+>\s*" + Aujourd'hui + "\s*<\/span>\s*$", "i");
var Anniversaire = document.evaluate("//div[@class='UIUpcoming_Item']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = Anniversaire.snapshotLength - 1; i >= 0; i--) {
   if (AnniversaireRegex.test(Anniversaire.snapshotItem(i).innerHTML)) {
      Anniversaire.snapshotItem(i).setAttribute('style','font-weight: bold; background: ' + highlightColor);
   }
}

MARCHE PAS :(