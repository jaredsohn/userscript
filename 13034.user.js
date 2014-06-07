// ==UserScript==
// @name          XFinalEden
// @namespace     YuJianrong@GMail.com
// @description	  将在线漫画站FinalEden在线漫画转化为批量下载链接页面
// @include       http://www.finaleden.com/Cartoon*
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

function PostProcess()
{
    var ff = evaluateXPath(document, "/html/body/script");

    eval(ff[0].text.replace(/window == top/,"false"));

    var i=1;
    for ( ; i<array_img.length;++i)
    {
        var FileLink = unescape(array_img[i]);
        document.writeln('<a href="' + FileLink + '"> ' + FileLink + "</a><br>");
    }
}

//window.addEventListener("load", function() {PostProcess();}, false);
PostProcess();
