// ==UserScript==
// @name justin.tv Auto submit
// @namespace *
// @include http://de.justin.tv/*
// ==/UserScript==

var inputs =  document.getElementsByTagName("INPUT");
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].value == "Ich bin 18 oder älter") {
      alert(inputs[i].value);
      inputs[i].click();
    }
  }