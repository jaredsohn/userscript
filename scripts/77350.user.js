// ==UserScript==
// @name           Formspring - Auto Anonymous
// @namespace      Formspring - Auto Anonymous
// @include        http://www.formspring.me/*
// ==/UserScript==


anonymousBtn = document.getElementById("anonymous");
if(anonymousBtn){
  anonymousBtn.checked = "checked";
}