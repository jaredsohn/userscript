// ==UserScript==
// @name           Google Search Site-block Plus
// @description    Selected web-sites aren't displayed from Google search result.
// @version        1.0
// @author         Shinya
// @namespace      http://www.code-404.net/
// @homepage       http://userscripts.org/scripts/show/12504
// @include        http://www.google.*
// @Note           Supported 'AutoPagerize' 0.0.12 or later.
// ==/UserScript==

/* == The Original Script Copyright =========
 * Written by leva.
 * http://note.openvista.jp/212/
 * 
 * Released under the CCL by-nc-na ja license.
 * http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
/* ======================================= */

// Therefore, the license of this script is under the CCL by-nc-na ja license, too.


(function() {

  // Blocked sites
  var blocks = new Array(
    "del.icio.us",
    "buzzurl.jp",
    "(a|b|r|mgw).hatena.ne.jp",
    "1470.net",
    "pookmark.jp",
    "bookmarks.yahoo.co.jp",
    "clip.(nifty|livedoor).com",
    "(esearch|tag|pt.afl).rakuten.co.jp",
    "psearch.yahoo.co.jp"
  );
  
  var mode = "weaken"; // "hidden" or "weaken"
  
  
  siteBlock($X("//div[@class='g']"));
  
  var filter = function(elm){
    siteBlock($X(".//div[@class='g']", elm[0]));
  }
  addFilter(filter);
  
  function siteBlock(results){
    for(var i = 0, l = results.length; i < l; i++){
      var anchor = $X(".//a[@class='l']", results[i])[0];
      for(var j = 0, b = blocks.length; j < b; j++){
        var regexp = new RegExp("^http:\/\/" + blocks[j].replace(".", "\.") + "\/", "i");
        if(anchor.href.match(regexp) != null){
          if(mode == "hidden"){
            results[i].style.display = "none";
          }
          else if (mode == "weaken"){
            var headline = $X(".//h2[@class='r']", results[i])[0];
            anchor.style.color = "#999"; // for other scripts
            headline.style.color = "#999";
            headline.nextSibling.style.display = "none";
          }
        }
      }
    }
  }
  
  /*
   * $X function from nulog
   * http://lowreal.net/logs/2006/03/16/1
   *
   * Thanks, cho45.
   */
  function $X (exp, context) {
    if (!context) context = document;
    var resolver = function(prefix){
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch(result.resultType){
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for(var i = 0, len = result.snapshotLength; i < len ; i++){
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }
  
  // For Autopagerize 0.0.12
  function addFilter(filter, i) {
    i = i || 4;
    if(window.AutoPagerize && window.AutoPagerize.addFilter){
      window.AutoPagerize.addFilter(filter);
    }
    else if(i > 1){
      setTimeout(arguments.callee, 1000, filter, i - 1);
    }
  }
  
})();
