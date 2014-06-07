// ==UserScript==
// @name          Show Password on Focus
// @namespace     http://userscripts.org/users/david2
// @version       0.1.0
// @description   Shows your password when you select a password field.
// @updateURL     https://userscripts.org/scripts/source/177631.user.js
// @include       *
// @run-at        document-end
// @run_at        document_end
// ==/UserScript==

// Execute code after all JavaScript has loaded because some sites generate
// password fields using JavaScript.
window.addEventListener("load", function () {
  var passwordFields = document.querySelectorAll('input[type="password"]');
  for (var i = passwordFields.length; i--;) {
    passwordFields[i].addEventListener("focus", function() {
      this.type = "text";
    });
    passwordFields[i].addEventListener("blur", function() {
      this.type = "password";
    });
  }
});
