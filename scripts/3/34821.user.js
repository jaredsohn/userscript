// ==UserScript==
// @name           seb.se - Förstora koder
// @namespace      Qerub
// @include        https://*.vv.sebank.se/cgi-bin/pts3/wow/wo10.c1010.f001?I=
// @version        $Id$
// ==/UserScript==

(function() {
  // FIXME
  function xpath(query, root) {
    if (!root) { root = document }
    
    var eval = document.evaluate(query, root, null, XPathResult.ANY_TYPE, null);
  
    var result = [];
    while (x = eval.iterateNext()) { result.push(x); }
    return result;
  }

  window.addEventListener("load", function() {
   var codes = xpath("/html/body/form/div/div/div/div[2]/div/div/table/tbody/tr[3]/td[2]/span[@class='bold']");
 
   codes.forEach(function(code) {
     code.setAttribute("style", "font-size: 25px; vertical-align: -4px");
   })
  }, true)
})();
