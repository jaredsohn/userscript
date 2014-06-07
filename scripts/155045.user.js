// ==UserScript==
// @name        White-fix
// @namespace   blah
// @description Changes the white of torn's hospital back to grey
// @include     *.torn.com*
// @version     1
// ==/UserScript==

if (document.body.getAttribute('bgcolor') == "#FFFFFF") document.body.setAttribute('bgcolor','#CCCCCC');