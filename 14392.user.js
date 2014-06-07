// ==UserScript==
// @name           Download Mgoon Videos
// @namespace      sanxiyn@gmail.com
// @include        http://mgoon.com/view.htm?id=*
// @include        http://*.mgoon.com/view.htm?id=*
// ==/UserScript==

// 2007-11-23

function shuffle(str, steps, order) {
    var count = steps.length;
    var start = 0;
    var strs = new Array(count);
    for (var i = 0; i < count; i++) {
        var end = start + steps[i];
        strs[order[i]-1] = str.substring(start, end);
        start = end;
    }
    return strs.join('');
}

function decode(key) {
    var n = key.length;
    var q = n / 5;
    var r = n % 5;
    key = shuffle(key, [3,n-6,3], [3,2,1]);
    key = shuffle(key, [q+r-3,4,q+q+q-4,4,q-1], [1,4,3,2,5]);
    key = shuffle(key, [q+q+r-3,4,q-4,4,q+q-1], [1,4,3,2,5]);
    key = shuffle(key, [q+r,q,q,q,q], [5,4,2,1,3]);
    return key;
}

function decode_url(url) {
    var i;
    i = url.indexOf('=') + 1;
    var prefix = url.substring(0, i);
    var key = url.substring(i);
    i = key.indexOf('=');
    var trailer = '';
    if (i != -1) {
        trailer = key.substring(i);
        key = key.substring(0, i);
    }
    key = decode(key);
    url = prefix + key + trailer;
    return url;
}

var regex = /id=(\d+)/
var xmlbase = 'http://222.239.226.90/oc/get?id='
var xpath = 'VIDEO/@FLV_URL'

var loc = window.location.toString();
var id = regex.exec(loc)[1];

function callback() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: xmlbase + id,
        onload: function(response) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(response.responseText,
                'application/xml');
            var url = dom.evaluate(xpath, dom.documentElement, null,
                XPathResult.STRING_TYPE, null).stringValue;
            url = decode_url(url);
            window.open(url);
        }
    });
}

var element = document.getElementsByTagName('h2')[0];
var download = document.createElement('a');
download.innerHTML = 'Download';
download.addEventListener('click', callback, false);
element.appendChild(download);
