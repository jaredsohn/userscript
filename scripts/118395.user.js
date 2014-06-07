// ==UserScript==
// @author         Andreas Jung | A. Deniz Özgül
// @name           GTranslate - Add Clear Button
// @description    Google Translate'e Reset Butonu Ekleme
// @include        *translate.google*
// ==/UserScript==

if (document.getElementById('gt-submit')) {
   a=document.getElementById('gt-submit').parentNode;
   b=a.appendChild(document.createElement('input'));
   b.setAttribute('type','reset');
   b.setAttribute('style','margin-left: 13px;');
   b.setAttribute('class','jfk-button jfk-button-action');
}