// ==UserScript==
// @name            f1tRemBold
// @description     Usuwa bolda z pierwszego zdania w każdym akapicie artykułu na f1talks.pl
// @version         20120517125945
// @author          opsomh
// @licence         WTFPL; http://sam.zoy.org/wtfpl/
// @namespace       http://userscripts.org/users/465520/scripts
// @include         http://www.f1talks.pl/*
// ==/UserScript==

(function(){
    var s = document.createElement('style');
    s.type = 'text/css';
    s.appendChild(document.createTextNode('#post p>strong:first-child{font-weight:normal!important;}'));
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
})();
