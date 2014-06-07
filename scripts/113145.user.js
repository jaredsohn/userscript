// ==UserScript==
// @name           Dynamic JavaScript Library
// @version        1.0.0.0
// @license        Creative Commons
// @description    a Small Library Codes For JavaScript
// @include        *
// ==/UserScript==


var js = {
    Void: 'javascript:void(0)',
    click: function(target) {
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent('click', true, true);
        target.dispatchEvent(evObj);
    },
    //-----------------------------------------------------------------------//
    ID: function(_id) { return document.getElementById(_id) },
    TAG: function(_tagName) { return document.getElementsByTagName(_tagName) },
    CLASS: function(_className) { return document.getElementsByClassName(_className) },
    NAME: function(_name) { return document.getElementsByName(_name) },
    //-----------------------------------------------------------------------//
    setCookie: function(c_name, c_value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var value = escape(c_value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        return document.cookie = c_name + "=" + value;
    },
    getCookie: function(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                var getValue = unescape(y);
                if (getValue == null) {
                    getValue = '';
                };
                return getValue;
            }
        }
    },
    deleteCookie: function(c_name) { return setCookie(c_name, '', '-10') },
    //-----------------------------------------------------------------------//
    Create: function(tagName) { return document.createElement(tagName) },
    docFrag: function() { return document.createDocumentFragment() },
    txt: function(data) { return document.createTextNode(data) },
    //-----------------------------------------------------------------------//
    Event: function(target, type, listener, useCapture) { return target.addEventListener(type, listener, useCapture) },
    Exp: function(href) { return document.location.href.match(href) },
    Xpath: function(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); },
    //-----------------------------------------------------------------------//
    Num: function(value) { return value.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&,"); },
    Val: function(string, radix) { return parseInt(string, radix) },
    //-----------------------------------------------------------------------//
    XHR: function(method, url, onSuccess) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onSuccess(xhr);
        xhr.open(method, url);
        xhr.send(null);
    },
    Result_Handler: function(responseDetails) {
        var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
        doc = document.implementation.createDocument('', '', dt);
        html = doc.createElement('html');
        if (html.documentElement.innerHTML) { html.documentElement.innerHTML = responseDetails; }
        else { html.innerHTML = responseDetails; };
        if (doc.documentElement.appendChild) { doc.documentElement.appendChild(html); }
        else { doc.appendChild(html); };
    },
    //-----------------------------------------------------------------------//
    addStyle: function(css) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }
};
