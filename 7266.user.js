// Version 1.1
// (c) Sergei Stolyarov 
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           Amazon cover recoverer
// @namespace      http://regolit.com/userscripts
// @description    Allows to get normal cover images from albums page
// @include        http://amazon.com/*
// @include        http://www.amazon.com/*
// @include        http://amazon.de/*
// @include        http://www.amazon.de/*
// @include        http://amazon.fr/*
// @include        http://www.amazon.fr/*
// ==/UserScript==

function doLoadCover1()
{
    //try {
        var cover = document.getElementById('prodImage');
        if (cover) {
            var img_addr = cover.src;
            img_addr = img_addr.replace(/_AA[0-9]+/gi, '');
            var tc = cover.parentNode;
            if ('A' == tc.tagName) {
                tc = tc.parentNode;
            }
            if (tc) {
                var link = document.createElement('A');
                var br = document.createElement('BR');
                link.href = img_addr;
                link.innerHTML = 'Original image';
                tc.appendChild(br);
                tc.appendChild(link);

            }
        }
    //} catch (e){}
    var imgs = document.getElementsByTagName('IMG');
    var len = imgs.length;
    var i;
    for (i=0; i<len; i++) {
        var img = imgs[i];
        var ppp = img.parentElement.parentElement;
        var pa = img.parentElement;
        if (ppp.tagName == 'TD' && pa.tagName == 'A'
            && ppp.width == 115 && ppp.align == "center") 
        {
            var orig_addr = img.src.replace(/_AA[0-9]+_/gi, '').replace(/\._SL[0-9]+/gi, '');
            pa.href = orig_addr;
        }
    }
}

doLoadCover1();
