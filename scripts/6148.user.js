// ==UserScript==
// @name            Hide Invites to Gmail
// @namespace       geferson@gmail.com
// @description     2006-11-02: Hides Gmail invites.
// @include         http*://*mail.google.com/*mail/*
// ==/UserScript==

(function() {
    var style = document.createElement('style');
    style.setAttribute('id', '_nvi'); 
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementById('_nvi').sheet.insertRule('#nvi {display:none}', 0);

})();