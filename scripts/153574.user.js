// ==UserScript==
// @name            wykopAntyŚwinioBuka
// @description     Usuwa obrazek tła z nagłówka strony
// @version         20121224234419
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @include         http://www.wykop.pl/*
// ==/UserScript==

(function(){
    var s = document.createElement('style');
    s.type = 'text/css';
    s.appendChild(document.createTextNode('#header-con{background-image:none!important;}'));
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
})()