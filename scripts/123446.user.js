// ==UserScript==

// @name          4chan no spoiler

// @namespace     http://bitchtits.onion

// @description   greasemonkey no spoilers for jan 18 2012

// @include       http://*4chan.org/*

// @run-at        document-end

// @version 0.3
// ==/UserScript==

// 0.1: chrome 0.2: support user styles 0.3: support scriptish

function chan_update_spoilers() {
    var a = document.getElementsByClassName('spoiler');
    console.log(a);
    for (var e in a) {
        if (a.hasOwnProperty && !a.hasOwnProperty(e) || typeof a[e]['style'] === 'undefined') continue;
        a[e].onmouseover = a[e].onmouseout = '';
        a[e].style = '';
        a[e].style.color = '';
        a[e].style.backgroundColor = '';
    }
}

var d = document.getElementsByName('delform')[0];
if (typeof d === 'object') d.addEventListener('DOMNodeInserted', chan_update_spoilers, false);

chan_update_spoilers();