// ==UserScript==
// @name       TamperReload
// @namespace  http://tampermonkey.biniok.net/
// @version    0.2.24
// @icon       http://tampermonkey.net/favicon.ico
// @description  reload userscripts.org on errors
// @include    http://userscripts.org/*
// @copyright  2011+, Jan Biniok
// @nocompat   Chrome
// ==/UserScript==

var escapeForRegExp = function(str) {
    var re = new RegExp( '(\\' + [ '/', '.', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\' ].join('|\\') + ')', 'g');
    return str.replace(re, '\\$1');
};

var getStringBetweenTags = function(source, tag1, tag2) {
    var b = source.search(escapeForRegExp(tag1));
    if (b == -1) {
        return "";
    }
    if (!tag2) {
        return source.substr(b + tag1.length);
    }
    var e = source.substr(b + tag1.length).search(escapeForRegExp(tag2));

    if (e == -1) {
        return "";
    }
    return source.substr(b + tag1.length, e);
};

window.addEventListener("DOMContentLoaded", function() {
    
if (document.head) {
    var text = document.head.innerHTML;
         
    // replace any non-printable characters, then trim the result
    text = text.replace("(\0-\037)|(\0177-\0377)", "\040").trim();
    var title = getStringBetweenTags(text, '<title>','</title>');
    
    if (title &&
        (title.search('Internal Server Error') != -1 ||
         title.search('Bad Gateway') != -1 ||
         title.search('Not Found') != -1 ||
         title.search('Maintenance downtime') != -1)) {

        var s = '?';
        if (window.location.href.search(/\?/) != -1) s = '&';
        window.setTimeout(function() { 
            window.location.href = window.location.href + s + "ts=" + (new Date()).getTime();
        }, 1000);
    }
}
}, false);
