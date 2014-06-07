// ==UserScript==
// @name        Zybez form helper
// @namespace   zybform
// @description Auto-fills certain text boxes on Zybez' OSRS marketplace
// @include     *://forums.zybez.net/runescape-2007-prices/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version     1
// ==/UserScript==

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        document.styleSheets[0].cssText += css;
    }
}

addGlobalStyle(".hide {display: show ! important;}");

var notes = $("input[class='input_text'][name='notes']");

  notes.val("PM me :)");