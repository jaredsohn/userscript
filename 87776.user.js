// ==UserScript==
// @name 123
// @namespace 123
// @description 123
// @include *facebook.com/*group_136352559745225*
// ==/UserScript==

window.addEventListener(
'load',
function() { setInterval(function(){
asd = document.getElementsByClassName('mall_ufi_like');
for (i=0;i<asd.length;i++){
r = asd[i].firstChild.firstChild.nextSibling.innerHTML;
if (r != "") {
console.debug(r);
asd[i].firstChild.firstChild.nextSibling.innerHTML=r.replace(/^A (.*) le gusta esto\./, "$1 123").replace(/^A (.*) les gusta esto\./, "$1 123").replace(/^A ti(.*) os gusta esto\./, "Vos$1 123").replace(/Te gusta esto./, "123'd");
}}},250);
},
true);
