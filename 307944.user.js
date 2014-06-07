// ==UserScript==
// @name        KG_DisableTab
// @namespace   http://klavogonki.alexzh.ru
// @description Отключает кнопку Tab в поле ввода текста во время заезда
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
    var textbox = document.getElementById('inputtext');
    
    if(textbox) {
        textbox.onkeydown = function(e){
            if (e.keyCode == 9) {
                e.preventDefault();
            }
        }
    }
}

window.addEventListener("load", function() {
    // script injection
    exec(main);
}, false);