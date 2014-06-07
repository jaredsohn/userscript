// ==UserScript==
// @run-at document-start
// @name       Ridiculous Prank
// @version    1.01
// @description  An absolutely ridiculous prank that basically turns all web pages into "503 service unavailable" pages.
// @match      http://*/*
// @match      https://*/*
// @copyright  2012, DaVince
// ==/UserScript==

document.getElementsByTagName("html")[0].innerHTML = '<style type="text/css">* { display: none; }</style><h1>503 Service unavailable</h1>';
window.onload = function()
{
    document.getElementsByTagName("html")[0].innerHTML = '<h1>503 Service unavailable</h1>';
}