// ==UserScript==
// @name            Wykop - opis bez linku
// @description     Zamienia opis znaleziska w zwykły, nie klikalny tekst
// @version         20130418214845
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @downloadURL     http://userscripts.org/scripts/source/165173.user.js
// @updateURL       http://userscripts.org/scripts/source/165173.meta.js
// @grant           none
// @run-at          document-start
// @include         http://www.wykop.pl/link/*
// ==/UserScript==

(function(){
var main = function (){
    var o = document.querySelector('a.jsLink');
    o.parentNode.textContent = o.textContent;
};

if (document.readyState == 'complete' || document.readyState == 'interactive'){
    //gdy użyty w Operze z nazwą *.user.js lub bez `@run-at document-start`
    main();
} else {
    document.addEventListener('DOMContentLoaded', main, false);
}})()
