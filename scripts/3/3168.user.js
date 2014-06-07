// ==UserScript==
// @namespace     http://www.noandwhere.com/userscripts
// @name          Show xTools Title Entry
// @description   Shows and focuses the title entry box on Xanga's xTools window.
// @include       http://www.xanga.com/private/xtools/xtoolspremium.aspx*
// @include       http://editor.xanga.com/private/editor.aspx*
// ==/UserScript==

window.addEventListener("load", function(e) {
  document.getElementById("tControls").style.display = "block";
  document.getElementById("txtTitle").focus();
}, false);

//.user.js

