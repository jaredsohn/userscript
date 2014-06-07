// ==UserScript==
// @id             like2srirachasrk@gamecubic
// @name           Like-to-Sriracha
// @version        0.0
// @namespace      
// @author         Gamecubic
// @description    Makes the SRK forums more Tech Talk friendly.
// @domain         forums.shoryuken.com
// @include        http://forums.shoryuken.com/*
// @run-at         document-end
// ==/UserScript==

(function() {
    var rbl = document.querySelectorAll('.ReactButton-Like');

    for (var i = 0; i < rbl.length; ++i) {
        var item = rbl[i];
        item.title = 'Sriracha';

        var label = item.querySelector('.ReactLabel');
        label.innerHTML = 'Sriracha';
    }
})();
