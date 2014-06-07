// ==UserScript==

// @name           uydunet
// @description    title düzenleyici
// @namespace      aexay
// @include        https://online.turksat.com.tr/*
// ==/UserScript==


 function title_duzenle() {
           window.top.document.title = '3386598'; 
           setTimeout(title_duzenle, 2000);
        }

title_duzenle();