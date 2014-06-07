// ==UserScript==
// @name           Dictionary on Dbl-Click
// @namespace      http://hayaran.wordpress.com
// @description    This script shows small bubbles of information triggered by double-clicking any word
// @include        *
// ==/UserScript==

var t = document.createElement('script')
t.src = 'http://site.answers.com/main/js/web_answertip.js?ANSW.nafid=8'
document.body.appendChild(t);
t = document.createElement('span')
t.id='answerTipEnabled'
document.body.appendChild(t);
