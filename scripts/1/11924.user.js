// ==UserScript==
// @name           OpenSelectRightMouse
// @namespace      wretch
// @include        http://*.wretch.cc/*
// ==/UserScript==
function OpenUp(){
  b = document.getElementById("blog_main");
  setitup(b, "ondragstart", "true");
  setitup(b, "oncontextmenu", "true");
  setitup(b, "onselectstart", "true");
  return true;
}

function setitup(obj, key, value){
  obj.setAttribute(key, value);
}

OpenUp();