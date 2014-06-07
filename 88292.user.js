// ==UserScript==
// @name           Remove user comments (hs.fi, taloussanomat.fi)
// @namespace      http://userscripts.org/users/okko
// @description    Removes user comments from hs.fi and taloussanomat.fi
// @include        http://www.hs.fi/*/artikkeli/*
// @include        http://www.taloussanomat.fi/*
// ==/UserScript==

// function from http://userscripts.org/guides/46                                                                                             
function $x(x, t, r) {
    if (t && t.tagName)
        var h = r, r = t, t = h;
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case XPathResult.NUMBER_TYPE:
        p = 'numberValue';
        break;
    case XPathResult.STRING_TYPE:
        p = 'stringValue';
        break;
    case XPathResult.BOOLEAN_TYPE:
        p = 'booleanValue';
        break;
    case XPathResult.ANY_UNORDERED_NODE_TYPE:
    case XPathResult.FIRST_ORDERED_NODE_TYPE:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}
function $x1(x, r) { return $x(x, XPathResult.FIRST_ORDERED_NODE_TYPE , r) }
function $xb(x, r) { return $x(x, XPathResult.BOOLEAN_TYPE, r) }

var discussionsElement = $x1('//div[@class="articleOpinion"] | //div[@class="comments"]');

if (discussionsElement) {
    discussionsElement.parentNode.removeChild(discussionsElement);
}
