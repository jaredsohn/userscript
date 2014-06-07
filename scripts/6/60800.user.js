// ==UserScript==
// @name           Quote Text
// @namespace      http://perlover.com/quote_text/
// @description    Quote text by '> ' - Ctrl + Q - quote, Ctrl + Shift + Q - unquote
// @include        *
// ==/UserScript==

document.addEventListener('keydown', function(event){
    if ((event.keyCode != 81 || ! event.ctrlKey) && (event.keyCode != 81 || ! event.ctrlKey || ! event.shiftKey)) return;

    var target = event.target;
    if (!/textarea/i.test(target.nodeName)) return;

    var start = target.selectionStart;
    var end = target.selectionEnd;
    if (start == end) return;

    var text = target.value.substring(start, end);

    if (!event.shiftKey) {
        text = text.replace(/^((>*) )?/mg, '$2> ');
    } else {
        text = text.replace(/^>(>* )?/mg, '$1').replace(/^ /mg, '');
    }

    target.value = target.value.substring(0, start) + text + target.value.substring(end);
    target.selectionStart = start;
    target.selectionEnd = start + text.length;

    event.preventDefault();
    if (window.opera && window.opera.postError) {
        setTimeout(function(){ target.focus() }, 0);
    }
}, false);
