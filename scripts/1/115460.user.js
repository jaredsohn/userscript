// ==UserScript==
// @name           Comic Sans FTW
// @namespace      http://userscripts.org/users/129044
// @include        http://*
// ==/UserScript==
(function() {
function changeALLthefonts() {
var all = document.getElementsByTagName('*');
for(var k=0, elm; elm=all[k++];) {
	elm.style.fontFamily='Comic Sans MS';
}
}
changeALLthefonts();
document.body.addEventListener('DOMNodeInserted',function(e){setTimeout(function(){changeALLthefonts()},0)},false);
})();