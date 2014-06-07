// ==UserScript==
// @name           Auto-submit del.icio.us form
// @namespace      http://jonathanaquino.com
// @description    Immediately submits the form in the window that the del.icio.us add-on pops up
// @include        http://del.icio.us/*?url=*
// ==/UserScript==
document.getElementById('delForm').submit();