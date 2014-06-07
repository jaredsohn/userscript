// ==UserScript==
// @name         PassViewer
// @namespace    http://userscripts.org/users/zackton
// @description  onMouseOver event that shows typed password in forms 
// @include      *
// @updateURL    http://userscripts.org/scripts/source/175389.meta.js
// @run-at       document-start
// @grant        none
// @version      1.0.1
// ==/UserScript==

window.setTimeout(function() {
  var passFields = document.querySelectorAll("input[type='password']");
  if (!passFields.length) return;
  for (var i = 0; i < passFields.length; i++) {
    passFields[i].addEventListener("mouseover", function() {
      this.type = "text";
    }, false);
    passFields[i].addEventListener("mouseout", function() {
      this.type = "password";
    }, false);
  }
}, 1000)