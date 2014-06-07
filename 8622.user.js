// ==UserScript==
// @name           del.icio.us auto do not share
// @namespace      http://del
// @description    del.icio.us auto do not share
// @include        http://del.icio.us/*?url=*
// ==/UserScript==

window.document.getElementById('private').checked = true;
window.document.getElementById('tags').focus();
