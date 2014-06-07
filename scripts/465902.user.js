// ==UserScript==
// @name  PutinHuilo         
// @namespace
// @description Заменяет имя Путин в страницах на его настоящее имя.
// @include   *
// ==/UserScript==

var tagsWhitelist = ['PRE', 'BLOCKQUOTE', 'CODE', 'INPUT', 'BUTTON', 'TEXTAREA', 'SCRIPT', 'BODY', 'HTML', 'HEAD'];

function replace(original, replacement) {
  var all = document.getElementsByTagName("*");

  for (var i=0, max=all.length; i < max; i++) {
    var elem = all[i];
     if (tagsWhitelist.indexOf(elem.tagName) == -1) {
      elem.innerHTML = elem.innerHTML.replace(original, replacement);
    } 
  }
}

replace(/Пут[иі]на/gi, 'Хуйла');
replace(/Пут[иі]н/gi, 'Хуйло');