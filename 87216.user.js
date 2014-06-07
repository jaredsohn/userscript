// ==UserScript==
// @name           eksititle
// @description    title düzenleyici
// @namespace      aexay
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==


 function title_duzenle() {
           window.top.document.title = 'ek$i sozluk'; 
           setTimeout(title_duzenle, 2000);
        }
function icon_duzenle() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://eksisozluk.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}

icon_duzenle();
title_duzenle();