// ==UserScript==
// @name        KG_CancelRaceShortcut
// @namespace   http://klavogonki.alexzh.ru
// @description Добавляет сочетание клавиш для отмены результатов заезда
// @author      voidmain, unnamed777, novkostya
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
    var playerIndex = null;
    for(var i = 0; i < game.players.length; i++) {
        if(game.players[i].you) {
            playerIndex = i;
            break;
        }
    }
    document.addEventListener('keydown', function(e) {
        if(e.shiftKey && e.keyCode == 90 && game.players[playerIndex].info.finished) {
            game.delresult();
        }
    }, false);
}

window.addEventListener("load", function() {
    // script injection
    exec(main);
}, false);
