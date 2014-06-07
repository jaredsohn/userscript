// ==UserScript==
// @name           Identity of Conan
// @description    Google says the identity of Conan if you google Conan Edogawa(or 江戸川コナン).
// @version        0.1
// @author         Shinya
// @namespace      http://www.code-404.net/
// @homepage       http://userscripts.org/scripts/show/11333
// @include        http://www.google.*/search*
// @Note           
// ==/UserScript==

(function(){
  var query = $X("//input[@name='q'][1]")[0];
  
  var identity = "\u6c5f\u6238\u5ddd\u30b3\u30ca\u30f3"; // Conan Edogawa
  var didYouMean = query.defaultValue == identity ? "\u3082\u3057\u304b\u3057\u3066: " : "Did you mean: ";
  var answer = query.defaultValue == identity ? "\u5de5\u85e4\u65b0\u4e00" : "Shinichi Kudo";
  
  if(query.defaultValue == "" || query.defaultValue != doUnicodeUnescape(identity)
    && query.defaultValue.search(/^Conan Edogawa$/i) == -1) return;
  
  var href = document.location.search;
  var newQuery = query.defaultValue == identity ? encodeURIComponent(doUnicodeUnescape(answer))
    : "Shinichi+Kudo";
  var oldQuery = query.defaultValue == identity ? encodeURIComponent(query.defaultValue)
    : /Conan\+Edogawa/i;
  href = href.replace(oldQuery, newQuery);
  
  var divElm = document.getElementById("res");
  var pElm = document.createElement("p");
  var fontElm = document.createElement("font");
  fontElm.className = "p";
  fontElm.setAttribute("color", "#cc0000");
  var fontText = document.createTextNode(didYouMean);
  var aElm = document.createElement("a");
  aElm.className = "p";
  aElm.setAttribute("href", "/search" + href);
  var bElm = document.createElement("b");
  var iElm = document.createElement("i");
  var iText = document.createTextNode(answer);
  
  divElm.insertBefore(pElm, divElm.firstChild);
  pElm.appendChild(fontElm);
  fontElm.appendChild(fontText);
  pElm.appendChild(aElm);
  aElm.appendChild(bElm);
  bElm.appendChild(iElm);
  iElm.appendChild(iText);
  
  function doUnicodeUnescape(string){
    var regexp = /\\u([0-9a-fA-F]{4})/;
    var code;
    while(regexp.test(string)){
      eval('code = 0x' + RegExp.$1 + ';');
      string = string.replace('\\u' + RegExp.$1, String.fromCharCode(code));
    }
    return string;
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
})();
