// ==UserScript==
// @name        Confluence Minor Edit
// @namespace   net.xmlizer.cme
// @version     1
// @description  Atlassian Confluence: Check "Minor Edit" by default.
// @match      http://*/*
// ==/UserScript==
document.getElementById('minorEdit').checked = true
