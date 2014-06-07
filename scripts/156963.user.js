// ==UserScript==
// @name         Ludomedia bar fixer
// @namespace    http://userscripts.org/users/475424
// @description  Set the Ludomedia's top bar as fixed
// @include      *.ludomedia.it/*
// @version      0.3
// @updateURL    https://userscripts.org/scripts/source/156963.meta.js
// @downloadURL  https://userscripts.org/scripts/source/156963.user.js
// ==/UserScript==

$('.StrTop').css('position', 'fixed').css('width', '100%').css('top', '0');
$('.StrPag').css('padding-top', '60px');