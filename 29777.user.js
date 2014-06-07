// ==UserScript==
// @name           twitterLocalizedMaintenanceTime
// @namespace      http://d.hatena.ne.jp/send/
// @description    localize maintenance time at twitter.
// @include        http://twitter.com/home
// ==/UserScript==
(function(){
  var city = 'Tokyo';
  var win = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
  function filter(nodes) {
    var xpath = '/descendant::a[contains(@href,"timeanddate.com/worldclock/fixedtime.html")]';
    var clockXpath = '/descendant::td/a[starts-with(text(),"' + city + '")]/../following-sibling::td[position()=1]';
    nodes.forEach(function(node, index, array) {
      var elems = $x(xpath, node);
      for each (var elem in elems) {
        GM_xmlhttpRequest({
          method: "GET",
          url: elem.href,
          onload: function(xhr) {
            var responseDom = document.implementation.createDocument(null, 'html', null)
            var range = document.createRange();
            range.setStartAfter(document.body);
            var response = range.createContextualFragment(xhr.responseText.replace(/<!DOCTYPE(?:[^>]*)?>/,'').replace(/<\/?html(?:[^>]*)?>/,''));
            responseDom.documentElement.appendChild(responseDom.importNode(response,true));
            var result = $x(clockXpath, responseDom)[0].textContent;

            elem.innerHTML =  result + ' (' + city + ')' ;
          }
        });
      }
    });
  } 
  filter([document]);
  setTimeout(function(){
    if (typeof win.AutoPagerize != 'undefined') win.AutoPagerize.addFilter(filter);
  },0)

  /* utilities */

  /**
   * cho45's $x
   */
  function $x(exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = context.createExpression(exp, resolver);
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
          ret.push(result.snapshotItem(i));
        }
        return len != 0 ? ret : null;
      }
    }
    return null;
  }

})();
