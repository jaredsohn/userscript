// ==UserScript==
// @name       Hypebeyond 900pxl
// @version    0.1
// @match     http://*.hypebeyond.com/*
// @match     http://www.hypebeyond.com/*
// @run-at          document-start
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://www.abload.de/img/barra44s2a.jpg") {
         img.src = "http://abload.de/img/barra2tjstw.jpg";
    }
}
