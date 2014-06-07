// ==UserScript==
// @name           PLEAC Compare View
// @namespace      http://userscripts.org/users/yibe
// @description    Provides a side-by-side comparison
// @include        http://pleac.sourceforge.net/pleac_*/*.html
// @exclude        http://pleac.sourceforge.net/pleac_*/index.html
// @exclude        http://pleac.sourceforge.net/pleac_perl/*.html
// ==/UserScript==

if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

var url = window.location.href.replace(/(\/pleac_)[^/]+/, '$1perl');

window.addEventListener('load', function () {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = [
        'table { table-layout: fixed; }',
        'td { vertical-align: top; border: 2px solid #4f6f6f; }',
        'pre { margin: 0 auto; overflow-x: auto; }'
    ].join('');
    head.appendChild(style);
}, false);

GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html,application/xhtml+xml'
    },
    onload: function (responseDetails) {
        var tmp = document.createElement('div');
        if (responseDetails.responseText.match(/<body\b[\s\S]*?>([\s\S]+)<\/body\s*>/i)) {
            tmp.innerHTML = RegExp.$1;
        }
        var xpath = 'div[@class="SECT1"][1]/div[@class="SECT2"]/table[1]/tbody[1]/tr[1]/td[1]';
        var tds1 = getElementsByXPath('/html[1]/body[1]/' + xpath, document);
        var tds2 = getElementsByXPath(xpath, tmp);
        for (var i = 0; i < tds1.length; i++) {
            if (!tds1[i] || !tds2[i]) { continue; }
            tds1[i].parentNode.appendChild(tds2[i]);
        }
    }
});

function getElementsByXPath (xpath, node) {
    var nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var data = [];
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i));
    }
    return data;
}
