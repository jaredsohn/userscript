// ==UserScript==

// @name           itutitle
// @description    title düzenleyici
// @namespace      aexay
// @include        http://www.itusozluk.com/*
// @include        http://itusozluk.com/*
// ==/UserScript==


 function title_duzenle() {
           window.top.document.title = 'itu sozluk'; 
           setTimeout(title_duzenle, 2000);
        }
function icon_duzenle() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://www.itusozluk.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}

icon_duzenle();
title_duzenle();