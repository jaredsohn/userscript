// ==UserScript==
// @name            r24NKom
// @description     Włącza komentarze inline (bez wyskakującego okienka) na release24.pl
// @version         20120506112826
// @author          opsomh
// @licence         WTFPL; http://sam.zoy.org/wtfpl/
// @namespace       http://userscripts.org/scripts/show/132586
// @include         http://release24.pl/*
// ==/UserScript==

(function(){
    var script = document.createElement('script');
    script.textContent = 'doComments2 = doComments;';
    document.body.appendChild(script);
})();
