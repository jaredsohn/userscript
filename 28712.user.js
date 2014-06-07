// ==UserScript==
// @name           Goosh.Org Improvements
// @namespace      Goosh.Org Improvements
// @include        http://www.goosh.org/
// @include        http://goosh.org/
// ==/UserScript==
document.title="Goosh"
q = document.getElementById('inputfield');
function changetitle() {
document.title=q.value+" - Goosh";
if (q.value=="") {
document.title="Goosh"
}
if (q.value=="clear") {
document.getElementById('output').innerHTML=""
q.value=""
}
if (q.value=="@gooshinfo") {
q.value=""
window.open("http://www.goosh.org/?");
}
}
q.addEventListener("keyup", changetitle, true);
document.getElementById('output').innerHTML=""



