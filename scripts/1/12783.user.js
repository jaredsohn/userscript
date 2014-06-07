// ==UserScript==
// @name           STARCAT Channel Guide Prettifier
// @namespace      http://shinten.info/
// @include        http://tv.starcat.co.jp/channel/weekly/*/*
// ==/UserScript==

[
/*
    TEMPLATE
    {
        regex : /YOUR FAVORITE PROGRAM/,
        color : 'HIGHLIGHT COLOR'
    },
    EXAMPLE
    {
        regex : /HOUSE/,
        color : '#FFEEEE'
    },
*/
].forEach(function (show) {
    $X('//td/a', document.getElementById('body'), true).forEach(function (a) {
        if (show.regex.test(a.innerHTML)) {
            a.parentNode.style.backgroundColor = show.color;
        }
    });
});

var now = $X('//strong[@class="tv_now"]');

scrollToElement(now);
now.parentNode.style.backgroundColor = '#CCFFCC';


// from Prototype.js
function scrollToElement (element) {
    var pos = cumulativeOffset(element);
    window.scrollTo(pos.left, pos.top);
}

function cumulativeOffset (element) {
    var valueT = 0, valueL = 0, margin = 50;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return { left: valueL, top: valueT - margin };
}

// from ShareOnTumblr - http://userscripts.org/scripts/show/9695
// originate at cho45 - http://lowreal.net/
function $X(exp, context, multi) {
    if(typeof(unsafeWindow)!='undefined'){
        Node = unsafeWindow.Node;
    }

    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    var value = function(node){
        if(!node)
            return;

        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            return node;
        case Node.ATTRIBUTE_NODE:
        case Node.TEXT_NODE:
            return node.textContent;
        }
    }

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            if(!multi)
                return value(result.iterateNext());

            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(value(result.snapshotItem(i)));
            }
            return ret;
        }
    }
    return null;
}
