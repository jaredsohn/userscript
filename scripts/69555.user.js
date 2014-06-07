// ==UserScript==
// @name           last.fm steerable recommendations link fix
// @namespace      http://userscripts.org/users/34966
// @include        http://playground.last.fm/sterec*
// ==/UserScript==

var srlf = {
    fix: function() {
        var a = document.getElementById('bottombox').getElementsByTagName('div')[0].getElementsByTagName('a')[0];
        var aCopy = a.parentNode.appendChild(a.cloneNode(true));
        aCopy.href = aCopy.href.replace('lastfm://play/artists/', 'http://www.last.fm/listen/artists/');
        aCopy.getElementsByTagName('span')[0].innerHTML = 'Play Steerable Recommendations Radio';
        a.href = a.href.replace('lastfm://play/artists/', 'lastfm://artists/');
    }
}

window.addEventListener ('load', function (e) {srlf.fix(e);}, false);