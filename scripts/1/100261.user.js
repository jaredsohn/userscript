// ==UserScript==
// @name           upload files in gdocs not converted
// @namespace      http://www.google.com
// @description    Change default behavior for the bookmarklet "convert documents..." 
// @include        https://docs.google.com/DocAction?action=updoc&hl=en
// ==/UserScript==
document.getElementById("convert-checkbox").checked=false