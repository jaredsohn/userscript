// ==UserScript==
// @name        Mind42.com no ads
// @author      AAIIKK
// @version		0.1
// @description Simple ad remover!
// @include     http://mind42.com*
// ==/UserScript==

var overrideCSS = " \
#sidebar { display: none; } \
#content.sidebar2 { margin-right: 0; } \
#content.sidebar1 { margin-right: 0; } \
";
GM_addStyle(overrideCSS);
