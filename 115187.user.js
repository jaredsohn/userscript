// ==UserScript==
// @name           Flatten Fb Feeds
// @namespace      https://id.mixi.jp/asannou
// @include        http://www.facebook.com/
// @include        http://www.facebook.com/#
// @include        https://www.facebook.com/
// @include        https://www.facebook.com/#
// ==/UserScript==
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

setTimeout(function(){
    if (!clickIndicatorsAndReload()) {
        setInterval(clickIndicators, 5000);
    }
}, 1000);

function clickIndicatorsAndReload() {
    var e = getIndicatorElements();
    if (!e.length) {
        return false;
    }
/*
    (function(i) {
        if (!e[i]) {
            location.reload();
            return;
        }
        var c = arguments.callee;
        e[i].addEventListener("DOMNodeRemoved", function() {
            c(i + 1);
        });
        fireEvent(e[i], "click");
    })(0);
*/
    var f = function(i) {
        if (!e[i]) {
            location.reload();
            return;
        }
        var l = function() {
            f(i + 1);
        };
        e[i].addEventListener("DOMNodeRemoved", l);
        fireEvent(e[i], "click");
    };
    f(0);
    return true;
}

function clickIndicators() {
    var e = getIndicatorElements();
    for (var i in e) {
        fireEvent(e[i], "click");
    }
}

function getIndicatorElements() {
    var e = getElementsByXPath('//a[contains(@class, "highlightIndicator")]');
    var m = [];
    for (var i in e) {
        if (e[i].getAttribute("ajaxify").match(/&action=unhighlight&/)) {
            m.push(e[i]);
        }
    }
    return m;
}

function getElementsByXPath(xpath, node) {
    var nodesSnapshot = getXPathResult(xpath, node,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE || 7)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return data
}

function getXPathResult(xpath, node, resultType) {
    var node = node || document
    var doc = node.ownerDocument || node
    var resolver = doc.createNSResolver(node.documentElement || node)
    // Use |node.lookupNamespaceURI('')| for Opera 9.5
    var defaultNS = node.lookupNamespaceURI(null)

    if (defaultNS) {
        const defaultPrefix = '__default__'
        xpath = addDefaultPrefix(xpath, defaultPrefix)
        var defaultResolver = resolver
        resolver = function (prefix) {
            return (prefix == defaultPrefix)
                ? defaultNS : defaultResolver.lookupNamespaceURI(prefix)
        }
    }
    return doc.evaluate(xpath, node, resolver, resultType, null)
}

function addDefaultPrefix(xpath, prefix) {
    const tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g
    const TERM = 1, OPERATOR = 2, MODIFIER = 3
    var tokenType = OPERATOR
    prefix += ':'
    function replacer(token, identifier, suffix, term, operator, modifier) {
        if (suffix) {
            tokenType =
                (suffix == ':' || (suffix == '::' &&
                 (identifier == 'attribute' || identifier == 'namespace')))
                ? MODIFIER : OPERATOR
        }
        else if (identifier) {
            if (tokenType == OPERATOR && identifier != '*') {
                token = prefix + token
            }
            tokenType = (tokenType == TERM) ? OPERATOR : TERM
        }
        else {
            tokenType = term ? TERM : operator ? OPERATOR : MODIFIER
        }
        return token
    }
    return xpath.replace(tokenPattern, replacer)
}

function fireEvent(obj, evt) {
    var fireOnThis = obj;
    if (document.createEvent) {
        var evObj = document.createEvent("MouseEvents");
        evObj.initEvent(evt, true, true);
        fireOnThis.dispatchEvent(evObj);
    } else if (document.createEventObject) {
        fireOnThis.fireEvent("on" + evt);
    }
}

