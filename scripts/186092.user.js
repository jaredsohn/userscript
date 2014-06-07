// ==UserScript==
// @name           YaTupayaPizda
// @namespace      http://leprosorium.ru/*
// @description    Вы об этом давно мечтали, не так ли?
// ==/UserScript==


var find = ")))";
var repl = ")я тупая пизда)";
var page = document.body.innerHTML;

while (page.indexOf(find) >= 0) {
  var i = page.indexOf(find);
  var j = find.length;
page = page.substr(0,i) + repl + page.substr(i+j);

document.body.innerHTML = page;
}