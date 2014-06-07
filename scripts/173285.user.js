// ==UserScript==
// @name            Facebook Multichat
// @description     Send message to all open chatwindows
// @include         *.facebook.com/*
// @version         1.0
// ==/UserScript==

debug = false;
everywhere = false;

/*
Chat screen html:
" <textarea class="uiTextareaAutogrow _552m" onkeydown="window.Bootl.... "

Normal post textarea html:
" class="textInput mentionsTextarea uiTextareaAutogrow uiTextareaNoResize UFIAddCommentInput DOMControl_placeholder" name="add_comment_t.... "

Normal large chat
uiTextareaNoResize uiTextareaAutogrow _1rv DOMControl_placeholder
*/

// simulate enter keypress in a chatscreen
function pressenter( textareaobject ) {
    
    // create keypress event
    var evObj = document.createEvent('UIEvents');
    evObj.initUIEvent( 'keypress', true, false, window, 1 );
    evObj.keyCode = 13;
    
    // execute keypress on textarea
    textareaobject.dispatchEvent(evObj); 
}

// send message to multiple chatscreens
function multichat( message ) {

    // get textarea's
    areas = document.getElementsByClassName("uiTextareaAutogrow");

    // loop em
    for (i = 0; i< areas.length; i++) {

        // if everywhere not true, only send to chatscreens
        if (!everywhere) if (areas[i].classList.contains('mentionsTextarea') || areas[i].classList.contains('uiTextareaNoResize')) continue;
        
        // type message and press enter
        areas[i].value = message;
        if (!debug) pressenter(areas[i]);
        
    }
}

// show textarea to rule them all
function init_multichatprompt() {

    // get message, send message
    var mes = prompt("Multichat message", "");
    multichat ( mes );
    
}

// check if ctrl + m is pressed in entire document
function KeyPress(e) {
            var evtobj = window.event ? event : e;
            if (evtobj.keyCode == 77 && evtobj.ctrlKey) init_multichatprompt();
}

// bind to key event for ctrl-m(ultichat)
document.onkeydown = KeyPress;