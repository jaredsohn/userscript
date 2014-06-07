// ==UserScript==
// @name Line Number Fixer for GitHub
// @namespace http://userscripts.org/users/127885/scripts
// @description Fixes the line number bug that exists in Google Chrome when viewing files on GitHub
// @include https://*github.com*/blob*
// @require http://code.jquery.com/jquery-1.4.4.js
// ==/UserScript==

jQuery("#files .file .data pre").css({ "font-size": "113%" });