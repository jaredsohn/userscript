/*
  GreaseMonkey userscript for showing prices in your local currency.
  Customize to your own currency/rate below.

  New to GreaseMonkey?  <URL: http://greasemonkey.mozdev.org/ >

  2005-04-17  Carl Henrik Lunde  chlunde+greasemonkey <at> ping.uio.no
  2005-05-27 modified to handle prices with commas by Ahmad Alnusif (godaii <at> gmail.com)
*/

// Customize to fit:
var currency = "KD";
var rate = 0.296;

// Should be OK
var elnames = new Array("td", "font", "b", "span");

// ==UserScript==
// @name          Amazon Local Currency
// @namespace     http://www.ping.uio.no/~chlunde/stuff
// @description   Show prices in you local currency
// @include       http://www.amazon.com/*
// ==/UserScript==

(function() {
  for (elname in elnames) {
    var elems = document.getElementsByTagName(elnames[elname]);
    for (i = 0; i < elems.length; i++) {
      var price = elems[i];
      var idx = price.innerHTML.indexOf('\$');
      if (idx != -1 && idx < 3 && price.innerHTML.length < 32) {
        var mystring= price.innerHTML.substr(idx + 1);
        rExp=/,/g;
        result=mystring.replace(rExp ,'');	
        //var amount = Math.round(parseFloat(price.innerHTML.substr(idx + 1))* rate*100)/100;
        var amount = Math.round(parseFloat(result)* rate*100)/100;
        var container = document.createTextNode(" ("+amount+" "+currency+")");
        price.appendChild(container);
      }
    }
  }
})();
