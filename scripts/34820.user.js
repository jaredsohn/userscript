// ==UserScript==
// @name           seb.se - Färglägg belopp
// @namespace      Qerub
// @include        https://*.vv.sebank.se/cgi-bin/pts3/WOW/wow/1000/1100/wow1102.aspx?*
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
    var root = document.getElementById("IKPMaster_MainPlaceHolder_ucAccountStatements_pnlAccountTransactions");
    
    var cells = xpath("//td[5]/*", root);
 
    cells.forEach(function(cell) {
      var color = (cell.textContent[0] == "-") ? "#A61E1E" : "#28A110";
      cell.setAttribute("style", "color: " + color +  " !important");
    })
  }, true)
})();
