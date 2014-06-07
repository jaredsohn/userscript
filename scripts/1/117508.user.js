// ==UserScript==
// @name          隐藏reader topbar
// @namespace     http://iiiii.aau.cn
// @description   隐藏reader topbar
// @include       http://*.google.com/reader
// @include       https://*.google.com/reader
// ==/UserScript==
(function(){
document.getElementById("top-bar").style.display = "none";
})();