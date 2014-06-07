// ==UserScript==
// @name           ShoutboxBezLimitu
// @namespace      Maslo
// @include        http://modliszki.p2a.pl/index.php
// ==/UserScript==
var elements = document.getElementsByName("message");
elements[0].setAttribute("maxlength", "180");