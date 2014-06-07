// ==UserScript==
// @name           Bol.com van Stockum Price Check
// @author         Daniel "DXL" de Leeuw <danieldl@gmail.com
// @namespace      data:text/plain;BolComVanStockumPriceCheck
// @description    Toont op bol.com prijzen van boeken bij Van Stockum
// @include        http://www.nl.bol.com/is-bin/INTERSHOP.enfinity/eCS/Store/nl/*
// ==/UserScript==

var allSpans, thisSpan;
allSpans = document.evaluate(
    "//span[@class='small']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    if(thisSpan.innerHTML.match(/ISBN13/)) {     
      var a = thisSpan.innerHTML.match(/[0-9]{13}/);
      ISBN13 = a[0];
      GM_log(ISBN13);
    }
}

    xhr = GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.vanstockum.nl/search?showsubjects=&q%5Bisbn%5D='+ISBN13,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey (Bol.com Prijscheck door DXL <danieldl@gmail.com>)',
          /* 'Accept': 'application/atom+xml,application/xml,text/xml', */
      },
      onload: function(responseDetails) {
        GM_log('check');
          var a = responseDetails.responseText.match(/([0-9]+?)\.([0-9]+?)</);
          if(a) {
            prijs = '<br />van Stockum prijs: <span class="price">&euro;'+a[1]+','+a[2]+'</span><br/>';
            GM_log(a[1]+','+a[2]);
            var allSpans = document.evaluate(
              "//span[@class='price']",
              document,
              null,
              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
              null);
            for (var i = 0; i < 1; i++) {
                thisSpan = allSpans.snapshotItem(i);
                prijsspan = document.createElement('span');
                prijsspan.innerHTML = prijs;
                thisSpan.parentNode.insertBefore(prijsspan, thisSpan.nextSibling.nextSibling);
            }
          } else
            GM_log(':(');
      }
    });