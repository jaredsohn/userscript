// ==UserScript==
// @name           XNXX.COM download
// @namespace      tag:drifter-x-xnxx-download
// @description    Directly download flv videos from xnxx.com
// @include        http://video.xnxx.com/video*
// ==/UserScript==
// 7-Feb-2011

(function() {
var render_url = function(url) {
    var tr = document.evaluate('/html/body/div/table[2]/tbody/tr', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var td = document.createElement('td');
    var a = document.createElement('a');
    a.href = url;
    a.appendChild(document.createTextNode('Direct download'));
    td.appendChild(a);
    tr.appendChild(td);
};

var get_xv_url = function() {
    var url;

    GM_xmlhttpRequest({
        method: 'GET',
        url: window.location,
        onload: function(resp) {
            var match = resp.responseText.match( /flv_url=(http.+?)&amp;/ );
            if (match) {
                url = unescape(match[1]);
                render_url(url);
            }
        }
    });
};

get_xv_url();
}());
