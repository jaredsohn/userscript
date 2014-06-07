// ==UserScript==
// @name           Klawisz P dla przycisku >ok<
// @namespace      tomikkk (pl23)
// @description    Klawisz P potwierdza wysyłanie rozkazu
// @include        http://pl*.plemiona.pl/*
// ==/UserScript==

// @version 1.0

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
	GM_log("Taste " + thechar);
	switch (thechar){			
		case "P":
			send_away();
	}
}

function send_away(e) {
	doc = getGameDoc();
	doc.getElementsByName("submit")[0].click();
}