// ==UserScript==
// @name           Smart Ctrl+W: delete word or close tab
// @namespace      http://arty.name/
// @description    If you're editing text, Ctrl+W will delete word before cursor, otherwise it will close tab. 
// @include        *
// ==/UserScript==

document.addEventListener('keypress', function(event){
    var target = event.target;
    if (event.ctrlKey && event.charCode == 'w'.charCodeAt(0) 
        && (/textarea/i.test(target.nodeName)
            || (/input/i.test(target.nodeName)
                && /text|password/.test(target.type))))
    {
        event.preventDefault();
        var position = target.selectionStart;
        var rOffset = target.value.length - position;
        if (position != target.selectionEnd) return;
        target.value =
            target.value.substring(0, position - 1).
                replace(/[^ \n\r`~!@#$%^&*()_+-=\[\]{}\\|\/;:'",.<>\?]+$/, '')
            + target.value.substring(position);
        target.selectionEnd = target.selectionStart = target.value.length - rOffset;
    }
}, false);