// ==UserScript==
// @name            Mercola Annoyance Remover
// @namespace       Codesuidae
// @include         http://www.mercola.com/*

window.addEventListener("load", function() { document.getElementById('overlay').style.display = "none";
  document.getElementById('overlaybase').style.display = "none"; }, false);
