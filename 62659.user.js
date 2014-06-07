// ==UserScript==
// @name           Safari Proquest
// @namespace      DevSteve
// @description    Remove top banner space from Safari PRoquest
// @include        http://proquest.safaribooksonline.com/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
var i;
for (i = 0; i < divs.length; i++) {
    if (divs[i].id == 'pagetopid') {
        divs[i].style.display = 'none';
    }
}