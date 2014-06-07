// ==UserScript==
// @name            SpellCheckPlus
// @version         1.0
// @namespace       http://userscripts.org/users/jaxo
// @description     Removes nags, text limits & ads
// @include         http://spellcheckplus.com/
// ==/UserScript==

// Fake "pro" version

window.location = "javascript:defaultResizableEditor=true;x()";

// Clean up page & remove ads

var e = document.getElementById("account");
e.parentNode.removeChild(e);
e = document.getElementById("blurb");
e.parentNode.removeChild(e);
e = document.getElementById("abovecontent");
e.parentNode.removeChild(e);
e = document.getElementsByTagName("table")[10];
e.parentNode.removeChild(e);