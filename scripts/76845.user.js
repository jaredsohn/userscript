// ==UserScript==
// @name           Press X to hit >ok<
// @namespace      agrafix
// @description    Erlaubt das Abschicken von Formularen via einen Tastendruck auf "X"
// @include       *
// ==/UserScript==

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
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
    GM_log("Taste " + thechar + " wurde gedr?ckt!");
    switch (thechar){            
        case "C":
            send_away();
    
        case "V":
            attack();
    }
}

function send_away(e) {
    doc = getGameDoc();
    doc.getElementsByName("submit")[0].click();
}

function attack(e) {
    doc = getGameDoc();
    doc.getElementsByName("attack")[0].click();
} 