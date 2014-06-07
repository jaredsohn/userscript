// ==UserScript==
// @name           AromaEmbed
// @namespace      http://polog.org/
// @description    aroma video embed wmv
// @include        http://www.aroma-p.com/member/content/samplemovie.php*
// ==/UserScript==

var $X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);

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
        return ret;
    }
    }
    return null;
}


var src = $X('//param')[0].value.replace(/^mms/, 'http')
var movie = unsafeWindow.document.createElement('embed');
movie.src = src;
movie.autostart = 'true';
movie.width = 800;
movie.height = 600;
unsafeWindow.document.body.appendChild(movie);