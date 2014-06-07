// ==UserScript==
// @name           Highlight TeVe-Blad 
// @namespace      *
// @include        http://teveblad.be/*/grid.asp
// ==/UserScript==

function timeToDate(time) {
  var hm = time.split(".");
  var d = new Date();
  d.setHours(hm[0]); 
  d.setMinutes(hm[1]);
  return d;
}
var now = new Date();
Array.filter(document.getElementsByClassName("grid"), function (el) {
  var ft = el.parentNode.childNodes[2].textContent.split(" - ");
  if (now > timeToDate(ft[0]) && now < timeToDate(ft[1])) {
    el.parentNode.parentNode.style.backgroundColor = "#DAD5C2";
  }
});
