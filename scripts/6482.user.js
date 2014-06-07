// ==UserScript==
// @name           Spellcheck all inputs
// @namespace      http://jes5199.livejournal.com 
// @description    sets spellcheck=true on all input fields! wow, I can't spell!
// @include        *
// ==/UserScript==

inputs = document.getElementsByTagName("input");
for(i = 0; i < inputs.length; i++){
  inputs[i].setAttribute("spellcheck","true");
}
