// ==UserScript==
// @name       WebQQ Editor Fix
// @namespace  http://web2.qq.com/
// @version    0.1
// @description  Fix the format loss when pasting to the webqq editor
// @match      http://web2.qq.com/*
// @copyright  2013, Li Shaohua
// ==/UserScript==

function fixpaste()
{
    Jx().ui.BaseEditor.observer.onPaste = function(evt){ 
        var s=evt.clipboardData.getData("text/plain"); 
        evt.stopPropagation(); 
        evt.preventDefault(); 
        setTimeout( 
            function(e, s){ 
                e.innerText = s; 
            }(this._divArea, s), 10);
	}
}

document.addEventListener( "DOMContentLoaded", 
                          function() {
                            setTimeout(fixpaste, 10000);
                          }, false);
