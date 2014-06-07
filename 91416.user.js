// ==UserScript==
// @name          TXT to IMG
// @include       *bungie.net*
// ==/UserScript==
function MyHead() {
var find = "¦";
var repl = "<img src='http://img257.imageshack.us/img257/9885/bungielogo.png'>";
var page = document.body.innerHTML;
while (page.indexOf(find) >= 0) {
var i = page.indexOf(find);
var j = find.length;
page = page.substr(0,i) + repl + page.substr(i+j);
document.body.innerHTML = page;
}