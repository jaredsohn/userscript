// ==UserScript==
// @name           Press X to hit ok + kataziel
// @namespace      addicted. (Orginal von Ninos)
// @description    Erlaubt das Abschicken von Formularen via einen Tastendruck und auswählen des Kataziels
// @include       http://revolution.*.com:*/game.php?*&screen=place*&try=confirm*
// ==/UserScript==

String.prototype.trim = function() {return this.replace(/^s+|s+$/g, "");};
document.addEventListener('keyup', aKeyWasPressed, false);

// get doc
function getGameDoc() {
    getdoc = window.document;
    
    if(!getdoc.URL.match('game\.php')) {
        for(var i=0; i<window.frames.length; i++) {
            if(window.frames[i].document.URL.match('game\.php')) {
                getdoc = window.frames[i].document;
            }
        }
    }
    
    return getdoc;
}

// handler
function aKeyWasPressed(e) {
    var key = e.keyCode;
    var thechar = String.fromCharCode(key);
    switch (thechar){    
        case "X":
            send_only_away();
            break;
        case "W":
            send_away("wall");
            break;
        case "B":
            send_away("farm");
            break;
    }
}

function send_only_away(e) {
    doc = getGameDoc();
    doc.getElementsByName("submit")[0].click();
}

function send_away(building) {
    doc = getGameDoc();
    doc.getElementsByName("building")[0].value = building;
    doc.getElementsByName("submit")[0].click();
}; 