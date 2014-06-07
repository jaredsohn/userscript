// ==UserScript==
// @name           mixi Comment Jumper
// @namespace      http://shinten.info/
// @include        http://mixi.jp/view_bbs.pl*
// @include        http://mixi.jp/view_enquete.pl*
// @include        http://mixi.jp/view_event.pl*
// ==/UserScript==

$X('//span[@class="senderId"]').forEach(function (span) {
    span.id = span.textContent.match(/\d+/)[0];
});

$X('//dl[@class="commentContent01"]/dd').forEach(function (dd) {
    dd.innerHTML = dd.innerHTML.replace(/(?:(?:&gt;)?&gt;|＞)(\d+)/g, function (match, no) {
        if (!document.getElementById(no)) return match;
        return ['<a href="#', '">&gt;&gt;', '</a>'].join(no);
    });
});

// cho45 - http://lowreal.net/
function $X (exp, context) {
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

