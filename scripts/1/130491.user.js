// ==UserScript==
// @name           LFS
// @namespace      http://geoffreyvedernikoff.com
// @description    navigation for LFS
// @include        http://www.linuxfromscratch.org/*
// ==/UserScript==
document.onkeypress = function(event) {
  var code = event.keyCode;
  console.log(code);
  if (code == 39) {
    document.getElementsByClassName('next')[0].getElementsByTagName('a')[0].click();
  } else if (code == 37) {
    document.getElementsByClassName('prev')[0].getElementsByTagName('a')[0].click();
  }
}
