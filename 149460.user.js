// ==UserScript==
// @id             www.google.com.tr-633d66f2-944b-4975-863b-2739924885dc@Hasan Cengiz
// @name           Degooglizer
// @version        1.0
// @namespace      Hasan Cengiz
// @author         Hasan Cengiz
// @description    Removes Google redirection links out to direct links
// @include        https://www.google.com/*
// @include        http://www.google.com/*
// @include        https://www.google.com.tr/*
// @include        http://www.google.com.tr/*
// @run-at         document-end
// ==/UserScript==


var results=unsafeWindow.document.getElementById('rso').getElementsByClassName('l');

for(var say in results){
results[say].removeEventListener('mousedown',onmousedown,false);
results[say].removeAttribute('onmousedown');
}