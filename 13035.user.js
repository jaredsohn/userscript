// ==UserScript==
// @name          KTXP BT
// @namespace     YuJianrong@GMail.com
// @description	  浏览 KTXP BT发布站发布贴时直接下载
// @include       http://bt.ktxp.com/show*
// ==/UserScript==

// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.

function evaluateXPath(aNode, aExpr) {
  var xpe = new XPathEvaluator();
  var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    aNode.documentElement : aNode.ownerDocument.documentElement);
  var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  var found = [];
  var res;
  while (res = result.iterateNext())
    found.push(res);
  return found;
}
var ff = evaluateXPath(document, "/html/body/div/div[3]/div/table/tbody/tr/td[2]/a");

//(function() {
//    window.location.href = ff[0].href;
//})();

function winClose()
{
	myWindow.close();
}
for (var f in ff)
{
    if (ff[f].textContent != '\u5F00\u59CB\u4E0B\u8F7D')
        continue;
    myWindow = window.open( ff[f].href );
    self.setTimeout('winClose()', 3000);
}
