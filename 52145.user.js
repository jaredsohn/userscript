// ==UserScript==
// @name           co.nr Frame Remover
// @namespace      Aaron Russell
// @include        http*://*.co.nr/
// @exclude        http://www.freedomain.co.nr/
// ==/UserScript==

window.location=document.getElementsByName('conr_main_frame')[0].src;