// ==UserScript==
// @name           LAST.FM Extend Paginations
// @namespace      http://userscripts.org/users/121410
// @include        http://www.last.fm/*
// @include        http://www.last.fm/*
// @include        http://www.lastfm.*
// @include        http://cn.last.fm/*
// ==/UserScript==

var paginations = document.querySelectorAll('.pagination');

for(var i in paginations) {
    var selected = +paginations[i].querySelector('.selected').innerHTML;
    var length   = paginations[i].querySelector('.lastpage').innerHTML;
    var baseUrl  = paginations[i].querySelector('.lastpage').getAttribute('href');
        baseUrl  = baseUrl.substring(0, baseUrl.length - length.length);
    var prevElement = paginations[i].querySelector('.prevlink');
    prevElement = prevElement ? prevElement.cloneNode(true) : null;
    var nextElement = paginations[i].querySelector('.nextlink');
    nextElement = nextElement ? nextElement.cloneNode(true) : null;

    paginations[i].innerHTML = '';
    paginations[i].setAttribute('style', 'overflow: auto; width: 80%; text-align: right;')

    if(prevElement)
        paginations[i].appendChild(prevElement);

    for(var j = 1; j <= +length; j++) {
        var a;
        if(j == selected) {
            a = document.createElement('span');
            a.setAttribute('class', 'selected');
        } else {
            a = document.createElement('a');
            a.setAttribute('href', baseUrl + j);
        }
        a.innerHTML = j;
        paginations[i].appendChild(a);
    }

    if(nextElement)
        paginations[i].appendChild(nextElement);
}