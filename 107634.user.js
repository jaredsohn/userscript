// ==UserScript==
// @name       Hmm-Le-Browser
// @namespace  http://hmm-la-bd.eu/
// @version    0.1
// @description  Description inutile.
// @include    http://*hmm-la-bd.eu/*
// @copyright  2011+, ashka
// ==/UserScript==

function KeyCheck(e) {
    img = document.getElementsByTagName('img');
    if (e.keyCode == 37) {
        var j=0;
        for(var i in img) {
            if (img[i].getAttribute('width') == '150px') {
                j++;
            }
            if (j > 1) {
                var link = img[i].parentNode.href;
                window.location = link;
                img = null;
            }
        }
    }
    if (e.keyCode == 39) {
        var j=0;
        for(var i in img) {
            if (img[i].getAttribute('width') == '150px') {
                j++;
            }
            if (j > 3) {
                var link = img[i].parentNode.href;
                window.location = link;
                img = null;
            }
        }
    }
    if (e.keyCode == 38) {
        var j=0;
        for(var i in img) {
            if (img[i].getAttribute('width') == '150px') {
                j++;
            }
            if (j > 2) {
                var link = img[i].parentNode.href;
                window.location = link;
                img = null;
            }
        }
    }
}
window.addEventListener('keydown', KeyCheck, true); 
