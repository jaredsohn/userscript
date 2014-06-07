// ==UserScript==
// @name           Auto-sort Stats
// @namespace      https://aaa*
// @description    Automatically sorts the stats page by chats taken.
// @include        https://aaa*
// ==/UserScript==

(
function () 
{
window.onload= sort(0, 'chats');
}
();