// ==UserScript==
// @name          Disable Google Automatic Spelling Correction
// @namespace     http://userscripts.org/users/david2
// @version       0.1.3
// @description   Prevents Google from automatically changing your search keywords.
// @updateURL     https://userscripts.org/scripts/source/103507.user.js
// @include       *://*.google.tld/*
// @include       *://*.google.com/*
// @run-at        document-end
// @run_at        document_end
// ==/UserScript==

var searchForms       = document.querySelectorAll('form[action="/search"]');
var searchFormsLength = searchForms.length;

if (searchFormsLength) {
  // Create a hidden input that will prevent automatic correction.
  var input   = document.createElement("input");
  input.name  = "nfpr";
  input.type  = "hidden";
  input.value = 1;

  // Append the hidden input to each search form.
  for (var i = searchFormsLength; i--;) {
    searchForms[i].appendChild(input);
  }
}
