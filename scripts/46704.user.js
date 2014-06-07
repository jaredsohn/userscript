// ==UserScript==
// @name           Textarea indent/unindent with Tab/Shift+Tab
// @namespace      http://arty.name/
// @description    Select few lines in textarea and press Tab. Every line will be prepended with four spaces. Press Shift+Tab to revert. 
// @include        *
// ==/UserScript==

document.addEventListener('keydown', function(event){
    if (event.keyCode != 9 || event.ctrlKey || event.altKey) return;
    
    var target = event.target;
    if (!/textarea/i.test(target.nodeName)) return;
    
    var start = target.selectionStart;
    var end = target.selectionEnd;
    if (start == end) return;
    
    var text = target.value.substring(start, end);
    if (!/[\n\r]/.test(text)) return;
    
    if (!event.shiftKey) {
        text = '    ' + text.replace(/([\r\n]+)/g, '$1    ').replace(/([\r\n]+)    $/, '$1');
    } else {
        text = text.replace(/(^|[\r\n]+)    /g, '$1');
    }
    
    target.value = target.value.substring(0, start) + text + target.value.substring(end);
    target.selectionStart = start;
    target.selectionEnd = start + text.length;
    
    event.preventDefault();
    if (window.opera && window.opera.postError) {
        setTimeout(function(){ target.focus() }, 0);
    }
}, false);