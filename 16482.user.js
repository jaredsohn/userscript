// ==UserScript==
// @name           [Mine] - Clipnabber Clear Button
// @namespace      http://www.loleg.com/blog/
// @include        http://clipnabber.com/
// ==/UserScript==

var btn = document.createElement("div");
var frm = document.getElementById('chooser_form');

btn.innerHTML = '<input type=\"button\" value=\"\" style=\"background: url(http://imgcash4.imageshack.us/img204/1835/clearnp2.jpg); border: none; width: 50px; height: 22px; cursor: pointer; float: right; margin-top: -19px;\" onclick=\"document.getElementById(\'chooser_form\').reset()\" />';

frm.parentNode.insertBefore(btn, frm.nextSibling);
