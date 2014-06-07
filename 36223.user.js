// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Google Translate - Add Reset/Clear Button
// @namespace      http://www.w3.org/1999/xhtml
// @description    Adds a reset/clear button to translate.google.*
// @include        http://translate.google.*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

if (document.getElementById('gt-submit')) {
   a=document.getElementById('gt-submit').parentNode;
   b=a.appendChild(document.createElement('input'));
   b.setAttribute('type','reset');
   b.setAttribute('style','margin-left: 25px;');
   b.setAttribute('class','goog-button');
}