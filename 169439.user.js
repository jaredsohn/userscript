// ==UserScript==
// @name         NoPrint
// @namespace    http://userscripts.org
// @version      0.2
// @description  Removes all print-specific CSS from pages
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @match        http://*/*
// @match        https://*/*
// @copyright    2013+, Ionuț Leonte
// ==/UserScript==

$( 'link[media=print]' ).remove();
