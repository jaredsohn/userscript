// ==UserScript==
// @name           Add "Quote" and "Code" Buttons to Editor
// @namespace      rsc@kwierso.com
// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*
// ==/UserScript==

(function() {
    try {
        var editor = document.forms.namedItem("post").getElementsByTagName("div")[0];
        var editor2;
        if(editor != null) {
            editor2 = editor.getElementsByTagName("input");
            if(editor2.length == 0)
                return;
            for(i in editor2) {
                if(editor2[i].type == "button") {
                    editor = editor2[i].parentNode;
                    break;
                }
            }

            var spacer = document.createElement("span");
            spacer.innerHTML = " &nbsp; ";

            var quotebutton = document.createElement("input");
            var codebutton = document.createElement("input");
            
            quotebutton.className = "button";
            quotebutton.type = "button";
            quotebutton.value = "quote";
            quotebutton.style.width = "50px";
            quotebutton.addEventListener("click", addquote, true);
            editor.insertBefore(quotebutton, editor.childNodes[17]);

            codebutton.className = "button";
            codebutton.type = "button";
            codebutton.value = "code";
            codebutton.style.width = "50px";
            codebutton.addEventListener("click", addcode, true);

            editor.insertBefore(codebutton, editor.childNodes[17]);
            editor.insertBefore(spacer, quotebutton);
        }
    } catch(e) { /* Something went wrong or this page has no post form */ }
})();

function addquote(e) {
    var holder = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var text = holder.getElementsByTagName("textarea")[0];

    insertText(text, this);
    text.focus();
}

function addcode(e) {
    var holder = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var text = holder.getElementsByTagName("textarea")[0];

    insertText(text, this);
    text.focus();
}

function insertText(text, thisEl) {
    var start, end, tVal;
    tVal = thisEl.value;
    start = text.selectionStart;
    end = text.selectionEnd;
    
    if(start == end) {
        if(tVal.search(/\*/) >= 0) {
            thisEl.value = tVal.replace(/\*/, "");
            tVal = "/" + tVal;
        } else {
            thisEl.value = tVal + "*";
        }
        text.value = text.value.substring(0, text.selectionStart) + '[' + tVal.replace(/\*/, "") + ']' +
                     text.value.substring(text.selectionStart, text.textLength);
    }
    else {
        var tag = "[" + tVal.replace(/\*/, "") + "]";
        var length = tag.length;
        var data = text.value.substring(0, text.selectionStart) + tag;
        tag = "[/" + tVal.replace(/\*/, "") + "]";
        length += tag.length;
        data += text.value.substring(text.selectionStart, text.selectionEnd) +
                tag + text.value.substring(text.selectionEnd, text.textLength);
        text.value = data;
        text.setSelectionRange(start, end + length);
    }
}