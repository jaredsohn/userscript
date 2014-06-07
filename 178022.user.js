// ==UserScript==
// @name        sanePaste
// @namespace   http://hexmode.com/userscript/sanePaste/0
// @include     *
// @version     1
// @grant       none

txtarea = document.getElementsByTagName("textarea");
for(i=0;i<txtarea.length;i++) {
    txtarea[i].onpaste = textBoxEventHandler;
    txtarea[i].insertAtPoint = function(x) { insertHere(this, x); }
}


function insertHere(el, text) {
    startPos = el.selectionStart;
    endPos = el.selectionEnd;
    scrollTop = el.scrollTop;
    el.value = el.value.substring(0, startPos) +
        text + el.value.substring(endPos,
                                  el.value.length);
    el.focus();
    el.selectionStart = startPos + text.length;
    el.selectionEnd = startPos + text.length;
    el.scrollTop = scrollTop;
}

function removeNL(s) {
    return s.split(/-\n/).join("").split(/\n/).join(" ");
}

function textBoxEventHandler(e) {  
    txt = e.clipboardData.getData('text');
    e.preventDefault();
    a = txt.split(/\n\n+/).map(removeNL).join("\n\n");
    this.insertAtPoint(a);
}
// ==/UserScript==