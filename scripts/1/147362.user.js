// ==UserScript==
// @name facebook.com autofokus
// @namespace *
// @include https://www.facebook.com/checkpoint/
// ==/UserScript==

    function formfocus() {
      document.getElementById('machine_name').focus();
      document.getElementById('machine_name').value ="meiner";
   }
   window.onload = formfocus;