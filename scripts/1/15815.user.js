// ==UserScript==
// @name           Trac timeline chart
// @namespace      http://shinten.info/
// @include        http://*timeline*
// ==/UserScript==

var commits = {};
var feed = $X('//link[@rel="alternate"]/@href');
if (!feed) return;

var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var xml = (new DOMParser).parseFromString(xhr.responseText, 'text/xml');
            var authors = $X('//item/author/text()', xml, true);
            if (!authors.length) return;

            authors.forEach(function (a) { commits[a] = ++commits[a] || 1; });

            var chart = document.createElement('img');
            chart.src = 'http://chart.apis.google.com/chart?' + query(commits);
            document.getElementById('prefs').appendChild(chart);
        }
        else {
            log(xhr.status + ' : ' + xhr.statusText);
        }
    }
};
xhr.open('GET', ['http://', document.location.host, feed].join(''));
xhr.send(null);

function query (c) {
    var o = convdata(c);
    var t = [];
    for (var k in o) t.push(k + '=' + o[k]);
    return t.join('&');
}

function convdata (commits) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var data = {
        chd: ['s:'],
        chs: '350x150',
        cht: 'p3',
        chf: 'bg,s,F7F7F0'
    };
    var labels = [], values = [], colors = [];

    for (var name in commits) {
        labels.push(name);
        values.push(commits[name]);
    }

    var max = Math.max.apply(null, values);
    values.forEach(function (v) {
        var hex = dec2hex(255 - 200 * v / max);
        colors.push([hex, hex, hex].join(''));
        data.chd.push(chars.charAt(Math.round((chars.length-1) * v / max)));
    });

    data.chd  = data.chd.join('');
    data.chl  = labels.join('|');
    data.chco = colors.join(',');

    return data;
}

function log () {
    var c = unsafeWindow.console;
    if (c) c.log.apply(c, arguments);
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

// http://www.jonasjohn.de/snippets/javascript/dec2hex.htm
function dec2hex (n) {
    n = parseInt(n); var c = 'ABCDEF';
    var b = n / 16; var r = n % 16; b = b-(r/16);
    b = ((b>=0) && (b<=9)) ? b : c.charAt(b-10);
    return ((r>=0) && (r<=9)) ? b+''+r : b+''+c.charAt(r-10);
}
