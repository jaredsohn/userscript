// ==UserScript==
// @name           Chat Misfire Stopper
// @namespace      kol.interface.unfinished
// @description    Changes the colour of your chat command entry text if you start text with a '/'.
// @include        http://*kingdomofloathing.com/lchat.php*
// @include        http://*kingdomofloathing.com/mchat.php*
// @include        http://127.0.0.1:*/lchat.php*
// @include        http://127.0.0.1:*/mchat.php*
// @version        1.0.1
// ==/UserScript==

//Version 1.0.1
// - added the new chat as a target
// - now traps pasting text in (maybe only in very current browsers though)
//Version 1.0

function addHandler() {
    var ta = document.getElementsByName('graf')[0];
    if (ta) {
        ta.addEventListener('keyup',checkSlash,false);
        ta.addEventListener('change',checkSlash,false);
        ta.addEventListener('focus',checkSlash,false);
        ta.addEventListener('blur',checkSlash,false);
        ta.addEventListener('paste',checkSlash,false);
        ta.addEventListener('input',checkSlash,false);
    }
}

function checkSlash(e) {
    var txt = this.value;
    if (!txt) txt='';
    var slash = (txt.indexOf('/')==0);

    var s = this.getAttribute('style');
    if (slash) {
        if (!s || !s.match(/color:/)) {
            s = 'color: red;'+((s) ? s : '');
        } else 
            s = null;
    } else {
        if (s && s.match(/color:/)) {
            s = s.replace(/color:[^;]*[;]/,'');
        } else 
            s = null;
    }
    if (s) {
        this.setAttribute('style',s);
    }
}

addHandler();
