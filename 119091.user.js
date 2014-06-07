// ==UserScript==
// @name           Force Spellcheck on Textarea
// @description    Sets spellcheck=true on all 'textarea' fields
// @include        *
// ==/UserScript==

inputs = document.getElementsByTagName("textarea");
for(i = 0; i < inputs.length; i++){
  inputs[i].setAttribute("spellcheck","true");
}