// ==UserScript==
// @name           xkcd alt text
// @namespace      http://vaseeharan.net
// @description    Places xkcd alt text beneath the comic
// @include        http://xkcd.com/*
// ==/UserScript==

function $(id) { 
    return document.getElementById(id);
}

function findComic() {
    var content = $('middleContent');

    var img;
    var imgs = content.getElementsByTagName('img');
    for (var i = 0, m = imgs.length; i < m; i++) {
        img = imgs[i];
        if (img.src.match(/^http:\/\/imgs\.xkcd\.com\/comics\/[^\/]*\.png$/)) {
            return img
        }
    }
    return null;
}

function main() {
    var img = findComic();
    if (img == null) return;

    var span = document.createElement('em');
    span.id = 'altText';
    span.style.display = 'block';
    span.appendChild(document.createTextNode('"' + img.title + '"'));
    img.parentNode.insertBefore(span, img.nextSibling);
}

var intervalId;
function intervalWatch() {
    if (document.readystate == "complete" || findComic() != null) {
        clearInterval(intervalId);
        main();
    }
}

if (document.readystate == "complete") {
    main();
} else {
    intervalId = setInterval(intervalWatch, 200);
}
