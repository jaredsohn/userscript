// ==UserScript==
// @name           Download tvpot Videos
// @namespace      sanxiyn@gmail.com
// @include        http://tvpot.daum.net/*
// ==/UserScript==

String.prototype.trim = function () {
    var s = this;
    s = s.replace(/^\s+/, '');
    s = s.replace(/\s+$/, '');
    return s;
}

Deferred = function () {
    this.chain = [];
}

Deferred.prototype = {
    add: function (callback) {
        this.chain.push(callback);
    },
    call: function (value) {
        var chain = this.chain;
        var self = this;
        var callback = chain.shift();
        var result = callback(value);
        if (result instanceof Deferred) {
            result.add(function (value) { self.call(value) });
        }
    }
}

function parse_query(qs) {
    var result = new Object;
    var vars = qs.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        result[pair[0]] = pair[1];
    }
    return result;
}

function parse_params(element) {
    var result = new Object;
    var params = element.getElementsByTagName('param');
    for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var name = param.getAttribute('name');
        var value = param.getAttribute('value');
        result[name] = value;
    }
    return result;
}

function insert_download(element, url) {
    var download = document.createElement('a');
    download.innerHTML = 'Download<br>';
    download.setAttribute('href', url);
    element.parentNode.insertBefore(download, element);
    download.style.color = '#fff';
}

function extract(url, xpath) {
    var d = new Deferred();
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (response) {
            var text = response.responseText.trim();
            var parser = new DOMParser();
            var dom = parser.parseFromString(text, 'application/xml');
            var value = dom.evaluate(xpath, dom.documentElement, null,
                XPathResult.STRING_TYPE, null).stringValue;
            d.call(value);
        }
    });
    return d;
}

function process(element, id) {
    var url = 'http://flvs.daum.net/viewer/MovieLocation.do?vid=' + id;
    var d = extract(url, '@url');
    d.add(function (url) { return extract(url, '@movieURL'); });
    d.add(function (url) { insert_download(element, url); });
}

var regex = /clip\/loader.swf/;

var elements = document.getElementsByTagName('object');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var params = parse_params(element);
    if (!regex.test(params.movie))
        continue;
    var query = parse_query(params.FlashVars);
    var id = query.vid;
    process(element, id);
}
