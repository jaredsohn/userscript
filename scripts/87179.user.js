// ==UserScript==
// @name           Eksi_title
// @description    title düzenleyici
// @namespace      http://userscripts.org/users/ntpl
// @version        0.6
// @author         ntpl
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// @include        https://antik.eksisozluk.com/*
// ==/UserScript==


 function title_duzenle() {
           window.top.document.title = 'T.C. Çevre ve Orman Bakanlığı'; 
           setTimeout(title_duzenle, 2000);
        }
function icon_duzenle() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://www.cevreorman.gov.tr/COB/App_Master/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
}

icon_duzenle();
title_duzenle();