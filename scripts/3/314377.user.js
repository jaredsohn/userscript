// ==UserScript==
// @name        KG_EnterToSpace
// @namespace   http://klavogonki.alexzh.ru
// @description Заменяет нажатия клавиши Enter клавишей Space (пробел) во время заезда
// @author      voidmain
// @license     MIT
// @version     1.0
// @include     http://klavogonki.ru/g/*
// @grant       none
// @run-at      document-end 
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

function main() {
    $$$("#inputtext").keypress(function(e) {
        if (e.keyCode != 13) {
            return;
        }
        var start = this.selectionStart, end = this.selectionEnd, val = this.value;
        this.value = val.slice(0, start) + ' ' + val.slice(end);
        this.selectionStart = this.selectionEnd = start + 1;
        e.keyCode = 32;
        $$$(this).trigger(e);
        e.preventDefault();
    });
    
}

window.addEventListener("load", function() {
    // script injection
    exec(main);
}, false);