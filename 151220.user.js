// ==UserScript==
// @name       2ch.hk Chat AutoName
// @namespace  2ch.hk/chat
// @include    http://2ch.hk/chat/*
// @version    1.00.0001

// @resource   name Reginka
// ==/UserScript==

(function() {
    var name = GM_getResourceText("name");
    document.getElementsByTagName('button')[0].onclick = function() {
        var elem = document.getElementById('text_menu');
        var startMsg = "[" + tripCode + "] ";
        if(startMsg != elem.value.substr(0, startMsg.length) && (elem.value)) {
            elem.value = startMsg + elem.value;
        }
    }
})();