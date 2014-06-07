// ==UserScript==
// @name           uuu
// @namespace      http://polog.org/
// @description    uuu
// @include        *
// @updated        2008-06-20 23:30:00
// ==/UserScript==

// (c) cho45 http://lowreal.net/blog/2007/11/17/
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X (exp, context, type /* want type */) {
    if (typeof context == "function") {
        type    = context;
        context = null;
    }
    if (!context) context = document;
    var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
        var o = document.createNSResolver(context).lookupNamespaceURI(prefix);
        if (o) return o;
        return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
    });

    switch (type) {
        case String:
            return exp.evaluate(
                context,
                XPathResult.STRING_TYPE,
                null
            ).stringValue;
        case Number:
            return exp.evaluate(
                context,
                XPathResult.NUMBER_TYPE,
                null
            ).numberValue;
        case Boolean:
            return exp.evaluate(
                context,
                XPathResult.BOOLEAN_TYPE,
                null
            ).booleanValue;
        case Array:
            var result = exp.evaluate(
                context,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        case undefined:
            var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
            switch (result.resultType) {
                case XPathResult.STRING_TYPE : return result.stringValue;
                case XPathResult.NUMBER_TYPE : return result.numberValue;
                case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
                    // not ensure the order.
                    var ret = [];
                    var i = null;
                    while (i = result.iterateNext()) {
                        ret.push(i);
                    }
                    return ret;
                }
            }
            return null;
        default:
            throw(TypeError("$X: specified type is not valid type."));
    }
}

function uuu(){
   $X('//text()').forEach(function(obj){obj.data = obj.data.replace(/[^\s\n]/g, 'う')})
}

if(window.AutoPagerize)
       window.AutoPagerize.addFilter(uuu);
uuu();

