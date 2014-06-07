// ==UserScript==
// @name           use internal id on twitter
// @namespace      http://fuba.moaningnerds.org
// @include        http://twitter.com/*
// ==/UserScript==
//
// 2007-11-01 kzys modified
//   Change to get an internal id from link elements
//   when the first extraction is failed.
//
// 2007-10-06 fuba modified
//   Change to get an internal id from the href of "block."
//
// 2007-10-05 fuba modified
//   Change to get a Twitter id from the href of "Updates."
//
// 2007-10-04 fuba modified
//   Update getTwitterId()
//
// 2007-09-28 t.koyachi modified
//   Set replace targets: ['Following', 'Favorites']
//

(function () {

var getTwitterUserId = function () {
    var l = document.links;
    for (var i=0;i<l.length;i++) {
        if (l[i].innerHTML == 'block') {
            if (l[i].href.match(/\/(\d+)/)) return RegExp.$1
        }
    }
    l = document.getElementsByTagName('link');
    for (var i=0;i<l.length;i++) {
        if (l[i].getAttribute('rel') == 'alternate') {
            if (l[i].href.match(/\/(\d+)\./)) return RegExp.$1
        }
    }
    return;
};

var getTwitterId = function () {
    var l = document.links;
    for (var i=0;i<l.length;i++) {
        if (l[i].innerHTML == 'Updates') {
            if (l[i].href.match(/\/([^\/]+)$/)) return RegExp.$1
        }
    }
    return;
};

var id = getTwitterId();;
var user_id = getTwitterUserId();

if ((id == 'undefined') || (user_id == 'undefined')) return;
var re = new RegExp("\/"+id, 'i');

var sidebar = document.getElementById('side');
var links = sidebar.getElementsByTagName('A');

var replaceWords = ['Following', 'Favorites'];
var replaceRe = new RegExp('^' + replaceWords.join('|') + '$');
var count = 0;

for (var i=0;i<links.length;i++) {
    if (links[i].href) {
        var label = links[i].childNodes[0].nodeValue;
        if (typeof(label) == 'string' && replaceRe.exec(label)) {
            links[i].href = links[i].href.replace(re, '/' + user_id);
            if (++count == replaceWords.length) break;
        }
    }
}

})();