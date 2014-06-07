// ==UserScript==
// @name           Bypass Attack Site Alert
// @namespace      Aaron Russell
// @description    Automatically clicks "Ignore" when visiting /user/***/
// @include        http://thepiratebay.org/user/*
// @include        http://thepiratebay.org
// ==/UserScript==
document.getElementById('ignoreWarningButton').click();