// ==UserScript==
// @id             wololo.net-62ca0c01-3b58-4fe1-a7f1-12848c04d58a@scriptish
// @name           util-imageresize
// @version        1.0
// @namespace      xnx_util-imageresize
// @author         Xian Nox
// @description    
// @include        http://wololo.net/talk/*
// @run-at         document-end
// ==/UserScript==

var MAX_WIDTH = 500;

for(var i = 0; i < document.images.length; i++) {
    if(document.images[i].width > MAX_WIDTH) {
        document.images[i].height = MAX_WIDTH*document.images[i].height/document.images[i].width;
        document.images[i].width = MAX_WIDTH;
        document.images[i].style.border='2px solid #E8272C';
    }
}