// ==UserScript==
// @id             tieba.baidu.com-2b5d4bff-11b9-4b2c-bfba-8effa221d4a8@patrick880905@hotmail.com
// @name           Baidu Tieba Copy Scroll Fix
// @version        0.2
// @namespace      patrick880905@hotmail.com
// @author         patwonder
// @description    Fix copy & scroll problems with Firefox 9
// @include        http://tieba.baidu.com/p*
// @include        http://tieba.baidu.com/f?kz=*
// @include        http://tieba.baidu.com/f?kw=*
// @run-at         document-idle

// ==/UserScript==

setTimeout(function() {

var editor = document.getElementById('editor');
var editorarea = editor.getElementsByClassName('tb-editor-editarea')[0];
var shown = true;
var button = document.createElement('button');

function toggle() {
    if (shown) {
        editor.style.display = 'none'; button.innerHTML='打开回复框'; editorarea.setAttribute('contenteditable','false');
    } else {
        editor.style.display = 'block'; button.innerHTML='收起回复框'; editorarea.setAttribute('contenteditable','true');
    }
    shown = !shown;
}

button.addEventListener('click', toggle);
editor.parentNode.insertBefore(button, editor);

toggle();

},1000);

