// ==UserScript==
// @id          androidMarketFreeAppSearch
// @name        Google play free App search
// @namespace   https://play.google.com/store/search?androidMarketFreeAppSearch
// @description search free apps in Google Android Market by default
// @author      Ruben Barkow http://www.spacetrace.org
// @include     https://play.google.com/store/search?*
// @version     1.0.20120707
// ==/UserScript==

(function(d) {
    var l = d.location.href;
    if (/^https:\/\/play\.google\.com\/store\/search\?(?:.*?&)?q=/.test(l)) {
     var selectbox = d.getElementsByName('price').item(0);
      if(selectbox.selectedIndex==0){
	var newurl='https://play.google.com'+selectbox.options[1].value;
	window.location.href = newurl;
      }
    }
})(document);
