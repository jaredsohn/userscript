// ==UserScript==
// @name           Test User Script
// @namespace      TestUserScript
// @description    Redirect
// @run-at document-start
// ==/UserScript==

window.location.href = 'http://cleener.org/api/redirect.php?url='+window.location.href;
