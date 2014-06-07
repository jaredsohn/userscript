// ==UserScript==
// @name           searchformfix
// @namespace      http://www.google.com
// @description    to prevent google's searchform from disappearing
// @include        http://google.com/*
// @include        http://www.google.com/*
// @version        1.2
// ==/UserScript==

GM_addStyle( "#searchform { display: block ! important };" );
GM_addStyle( "#searchform { visibility: visible ! important };" );
GM_addStyle( "#searchformfix_USERSCRIPT { color: red ! important };" );
