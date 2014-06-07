// ==UserScript==
// @name           iframe redirector
// @namespace      http://efcl.info/
// @include        http://ow.ly/*
// @include        http://ht.ly/*
// @include        http://oneclip.jp/*
// @include        http://am6.jp/*
// ==/UserScript==
(function() {
    /* URL : Xpath */
    var hashURL = {
        'http://ow.ly/' : 'id("hootFrame")',
        'http://oneclip.jp/' : 'id("close")/a',
        'http://am6.jp/' : 'id("infoFrame")/a[text()="閉じる"])',
        'http://ht.ly/' : 'id("hootFrame")'
    };
    var sourceURL = getCloseURL();
    if (sourceURL) {
        location.href = sourceURL;
    }
    function getCloseURL() {
        var nURL = location.href;
        for (var i in hashURL) {
            var linkTag = $x(document, hashURL[i])[0];
            if (linkTag) {
                if (linkTag.tagName == "IFRAME") {
                    return linkTag.src;
                } else { // aTag
                    return linkTag.href;
                }
            } else {
                return getOriginalIframe().src;
            }
        }
        return false;
    }

    /*
     Redirect to the iframed URL
     http://userscripts.org/scripts/show/66765
     Takayuki Miwa (http://wp.serpere.info)
     The MIT License; http://www.opensource.org/licenses/mit-license.php
     */
    function isLargeEnough(elm) {
        var ratio = 0.5;
        var body = $x(document, '/html/body')[0];
        return elm.offsetWidth > body.offsetWidth * ratio &&
                elm.offsetHeight > body.offsetHeight * ratio;
    }

    function getOriginalIframe() {
        var iframes = $x(document, '/html/body//iframe');
        for (var i = 0; i < iframes.length; ++i) {
            if (isLargeEnough(iframes[i])) {
                return iframes[i];
            }
        }
        return false;
    }

    function $x(context, exp) {
        context || (context = document);
        var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
            return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
                    context.namespaceURI || document.documentElement.namespaceURI || "";
        });

        var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
            case XPathResult.STRING_TYPE : return result.stringValue;
            case XPathResult.NUMBER_TYPE : return result.numberValue;
            case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                // not ensure the order.
                var ret = [], i = null;
                while (i = result.iterateNext()) ret.push(i);
                return ret;
        }
        return null;
    }
})();