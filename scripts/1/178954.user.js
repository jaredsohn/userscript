// ==UserScript==
// @name       diary.ru new post cursor
// @namespace  http://userscripts.org/scripts/show/178954
// @author     dpleshakov (http://userscripts.org/users/473776)
// @version    1.0
// @description  Fixed problem with [cuRs]. You can use [curs_]
// @include      *://*.diary.ru/?newpost*
// @copyright  dpleshakov, 2013+
// ==/UserScript==

function SetCursor() {
    console.log("in SetCursor()");
    var cursorText = '[curs_]';
    var messageElement = document.getElementById('message');
    var cursorPosition = messageElement.value.indexOf(cursorText);
    if(cursorPosition != -1) {
        messageElement.value = messageElement.value.replace(cursorText, '');
        messageElement.focus();
        messageElement.selectionStart = messageElement.selectionEnd = cursorPosition;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function() {
        document.getElementById('message').oninput = SetCursor;
        
        var newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.innerHTML = SetCursor.toString();
        document.getElementsByTagName('head')[0].appendChild(newScript);
        
        var aElements = document.getElementsByTagName('a');
        for(var index = 0; index < aElements.length; ++index) {
            var currentAnchor = aElements[index];
            if(currentAnchor.getAttribute('onclick') && currentAnchor.getAttribute('onclick').indexOf('insertCodeHTML') != -1) {
                currentAnchor.setAttribute('onclick', currentAnchor.getAttribute('onclick').replace('[cuRs]', '[curs_]'));
                if(currentAnchor.getAttribute('onclick').indexOf('return false') != -1) {
                    currentAnchor.setAttribute('onclick', currentAnchor.getAttribute('onclick').replace('return false', 'SetCursor(); return false'));
                } else if(currentAnchor.getAttribute('onclick').indexOf('return insertCodeHTML') != -1) {
                    currentAnchor.setAttribute('onclick', currentAnchor.getAttribute('onclick').replace(new RegExp(/return (insertCodeHTML\(.*?\);)/), '$1 SetCursor(); return false;'));
                }
                
            }
        }
    },
    false);