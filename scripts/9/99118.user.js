// ==UserScript==
// @name			DonationReminder
// @namespace		http://tokyo.fffff.at/
// @description		Add donation links to amazon
// @author			ysugano
// @include			http://www.amazon.tld/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

(function() {

var priceSaved = $(".youSavePriceRow > .price");

priceSaved.html(priceSaved.html() + "and why don't you <a href=\"http://www.huffingtonpost.com/2011/03/15/how-to-help-japan-earthquake-relief_n_834484.html\">donate</a> them to Japan earthquake relief?")

})();