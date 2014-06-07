// ==UserScript==
// @name           Textarea Tab
// @namespace      /
// @description    Lets you write tabs in textareas
// @include        *
// ==/UserScript==

function setSelRange(inputEl, selStart, selEnd) { 
    if (inputEl.setSelectionRange) { 
        inputEl.focus(); 
        inputEl.setSelectionRange(selStart, selEnd); 
    } else if (inputEl.createTextRange) { 
        var range = inputEl.createTextRange(); 
        range.collapse(true); 
        range.moveEnd('character', selEnd); 
        range.moveStart('character', selStart); 
        range.select(); 
    } 
}
function caret(node) {
    if(node.selectionStart) return node.selectionStart;
    else if(!document.selection) return 0;
    var c = "\001";
    var sel = document.selection.createRange();
    var dul = sel.duplicate();
    var len = 0;
    dul.moveToElementText(node);
    sel.text = c;
    len = (dul.text.indexOf(c));
    sel.moveStart('character',-1);
    sel.text = "";
    return len;
}
function insertAtCursor(myField, myValue) {
    var top=myField.scrollTop;
    var where=caret(myField);
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
    myField.scrollTop=top;
    setSelRange(myField,where+myValue.length,where+myValue.length);
}

(function(){

texts=document.getElementsByTagName('textarea');

for (var i=0;i<texts.length;i++){
    texts[i].addEventListener('keypress',function(e){
        if ((e.keyCode||e.charCode)==9 && e.ctrlKey==1 && e.altKey==1){
            insertAtCursor(this,'    ')
        }
    },false);
}

})()
// created 5/14/07