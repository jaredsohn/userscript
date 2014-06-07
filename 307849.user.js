// ==UserScript==
// @name        KG_ErrorWork
// @namespace   http://klavogonki.alexzh.ru
// @description Позволяет проводить работу над ошибками до тех пор, пока все ошибки не будут исправлены
// @author      voidmain
// @license     MIT
// @version     1.1
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
    game.lastErrors = 0;
    Game.prototype.oldDoErrorWork = Game.prototype.doErrorWork;
    Game.prototype.doErrorWork = function() {
        this.lastErrors = this.errors;
        this.isReadyForErrorWork = false;
        this.oldDoErrorWork();
    }
    
    Game.prototype.oldFinish = Game.prototype.finish;
    Game.prototype.finish = function() {
        this.oldFinish();
        if(this.errors - this.lastErrors > 0) {
            $('errorwork').show();
            this.isReadyForErrorWork = true;
        }
    }
    
    document.addEventListener('keydown', function(e) {
        if(e.ctrlKey && e.keyCode == 38 && game.isReadyForErrorWork) {
            game.doErrorWork();
        }
    }, false);

    $$$('#errorwork').tipsy({html: true, fallback: 'Горячая клавиша:<br/>Ctrl+Up'});
}

window.addEventListener("load", function() {
    // script injection
    exec(main);
}, false);