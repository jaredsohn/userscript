// ==UserScript==
// @name           Wikipedia English-Polski
// @description    wyświetla polski odpowiednik pod tytułem w angielskojęzycznej wikipedii (i angielski odpowiednik pod tytułem w polskiej wikipedii)
// @version        1.1
// @author         Lord Nimai
// @license        Public Domain
// @include        http://en.wikipedia.org/wiki/*
// @include        https://en.wikipedia.org/wiki/*
// @include        http://pl.wikipedia.org/wiki/*
// @include        https://pl.wikipedia.org/wiki/*
// ==/UserScript==

(function(){
    if (document.location.href.indexOf('en.wikipedia.org') !== -1) {
        var wanted = 'pl';
        var header = 'po polsku: ';
    }
    else {
        wanted = 'en';
        header = 'po angielsku: ';
    }
    var siteSub = document.getElementById('siteSub');
    var plLink = document.evaluate("//li[@class='interwiki-" + wanted + "']/a", document, null, 9, null).singleNodeValue;
    if (siteSub && plLink) {
        var match = plLink.href.match(/\.wikipedia\.org\/wiki\/(.*)$/);
        if (match) {
            var newLink = document.createElement('a');
            newLink.href = plLink.href;
            newLink.textContent = decodeURIComponent(match[1]).replace(/_/g, ' ');
            siteSub.innerHTML = header;
            siteSub.appendChild(newLink);
            siteSub.style.display = 'block';
        }
    }
})();
