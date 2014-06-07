// ==UserScript==
// @name        Pretty JSON
// @namespace   qixinglu.com
// @description Make JSON text look better
// @include     http://*/*.json
// @grant       none
// ==/UserScript==

var format = function(text) {
    var json = JSON.parse(text);
    return JSON.stringify(json, null, 4);
};

var highlight = function(text) {
    // get from http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
    var json = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var reg = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
    var replace = function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    }
    return json.replace(reg, replace);
};

var addStyle = function(cssText) {
    var head = document.querySelector('head');
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = cssText;
    head.appendChild(style);
};

addStyle(
'pre {padding: 10px; margin: 10px;}' +
'.string {color: green;}' +
'.number {color: darkorange;}' +
'.boolean {color: blue;}' +
'.null {color: magenta;}' +
'.key {color: red;}'
);

document.body.innerHTML = '<pre>' +
                          highlight(format(document.body.innerHTML)) +
                          '</pre>';
