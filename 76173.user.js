// ==UserScript==
// @name           Scroll/Follow Sidebar for Google Search
// @match          http://www.google.com/search*
// @match          http://www.google.com/images*
// @match          http://www.google.co.jp/search*
// @match          http://www.google.co.jp/images*
// @include          http://www.google.com/search*
// @include          http://www.google.com/images*
// @include          http://www.google.co.jp/search*
// @include          http://www.google.co.jp/images*
// ==/UserScript==

(function(){
var leftnav = document.getElementById("leftnav");
leftnav.style["position"] = "fixed";leftnav.style.margin = "25px 0px 0px 0px";
document.getElementById("sfcnt").style.left = "151px";
document.getElementById("cnt").style["max-width"] = "1000px";
})();