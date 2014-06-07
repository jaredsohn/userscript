// ==UserScript==
// @name          AutoRefresh after 1 min
// @description   AutoRefresh a site after 1 minute
// @creator       pricne
// @require http://sizzlemctwizzle.com/updater.php?id=72232&days=2
// @include       *CommMsgs?*


// ==/UserScript==
// Change the number after document.location etc. in the following format "10" part is the seconds, ignore the 000, 1 sec is equal to 1000 Milli second so 10 sec equal to 10,000 Milli second


setTimeout(function() { document.location.reload(); } , 60000);