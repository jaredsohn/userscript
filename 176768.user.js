// ==UserScript==
// @name           tcache_cleaner
// @namespace      http://webmaster.corp.folha.com.br/tools/greasemonkey/tcache_cleaner
// @description    Remove as tags no template cache do UOL
// @include        http://staging.www.folha.com.br/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace( /&lt;%.*?%&gt;/gi , '' ) ;
