// ==UserScript==
// @name          Set as private and text/plain by default
// @namespace     http://pastie.org/
// @description   Set paste as private and text/plain by default.
// ==/UserScript==

document.getElementById("paste_restricted").checked = true;
document.getElementById("paste_parser_id").value = 6;
