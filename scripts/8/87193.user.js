// ==UserScript==
// @name           title
// @description    title düzenleyici
// @namespace      aexay
// @include        http://inci.sozlukspot.com/*
// @include        http://www.incisozluk.net/*
// @include        http://*.incisozluk.net/*
// ==/UserScript==


 function title_duzenle() {
           window.top.document.title = 'maddeler'; 
           setTimeout(title_duzenle, 2000);
        }
function icon_duzenle() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://www.iconarchive.com/download/gordon-irving/iWork-10/pages-black.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}

icon_duzenle();
title_duzenle();