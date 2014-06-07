// ==UserScript==
// @name            PhpMyAdmin Query Expander
// @namespace       http://software.sitesbr.net
// @description     Expands Query textarea of PhpMyAdmin
// @include          *phpmyadmin*
// @include          *dbmy*
// @include          *mysql*
// ==/UserScript==

ta = document.getElementById('sqlquery');
if(ta){
      ta.style.height="550px";
}