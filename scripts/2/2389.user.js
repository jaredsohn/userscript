// ==UserScript==
// @name          My eBay auto-forward
// @namespace     http://52g.de/
// @description   script to forward the browser from the my-ebay guest page to the real page
// @include       http://my.ebay.*/ws/eBayISAPI.dll?MyEbayForGuests*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de)

var url = document.location.href;
var locale = url.substring(url.indexOf(".ebay.", locale) + 6, url.indexOf("/ws", locale));
window.location.href = "http://signin.ebay." + locale + "/ws/eBayISAPI.dll?SignIn&ssPageName=h:h:sin:DE&ru=http%3A//my.ebay." + locale + "/ws/eBayISAPI.dll%3FMyEbayForGuests";

