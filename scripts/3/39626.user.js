// ==UserScript==
// @name           AutoPair Characters
// @namespace      autopair
// @description    Automatically add closing characters for opening characters such as quotes, () or {} for all textareas and text input
// @include        *
// ==/UserScript==


var pairOpener = "\"({[";
var pairCloser = "\")}]";

function setCaretTo(obj, pos) { 
    if(obj.createTextRange) { 
        /* Create a TextRange, set the internal pointer to
           a specified position and show the cursor at this
           position
        */ 
        var range = obj.createTextRange(); 
        range.move("character", pos); 
        range.select(); 
    } else if(obj.selectionStart) { 
        /* Gecko is a little bit shorter on that. Simply
           focus the element and set the selection to a
           specified position
        */ 
        obj.focus(); 
        obj.setSelectionRange(pos, pos); 
    }
} 


function checkForPair(event) {
    var character = String.fromCharCode(event.charCode);
    var pairI = pairOpener.indexOf(character);
    if (pairI != -1) {
        var v  = this.value;
        var ss = this.selectionStart;
        var se = this.selectionEnd;
        var cc = pairCloser[pairI];        
        var preSel  = v.substring( 0, ss);
        var sel     = v.substring(ss, se);
        var postSel = v.substring(se);
        this.value = preSel + sel + cc + postSel;
        setCaretTo(this, ss);
    }
}

function modifyForm() {
    
    var elements = document.getElementsByTagName("input");
    
    for (var e=0; e < elements.length; e++) {
        var ele = elements[e];
        if (ele.type == "text") {
            //text input
            ele.addEventListener("keypress", checkForPair, false);
        } 
    }
    
    var elements = document.getElementsByTagName("textarea");
    for (var e=0; e < elements.length; e++) {
        var ele = elements[e];
        //text area
        ele.addEventListener("keypress", checkForPair, false);
    }
}

var _timer = null;

if (/WebKit/i.test(navigator.userAgent)) { // sniff
    _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            if (_timer) clearInterval(_timer);
            modifyForm(); // call the onload handler
        }}, 10);
} else {
    window.addEventListener('load', modifyForm, true);    
}

