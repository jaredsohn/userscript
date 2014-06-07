// ==UserScript==
// @name           BlueTube 
// @version        0.1
// @author         accfxion
// @namespace      http://blog.arpitnext.com/
// @description    Swaps out YouTube logo with BlueTube logo
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @run-at         document-start
// ==/UserScript==


(function () {
var idlogo = document.getElementById('logo');
logouri = "http://i1181.photobucket.com/albums/x429/codybb1/BlueTube.png";
idlogo.alt="BlueTube home - For people who want a new youtube logo!";
idlogo.class="noni";
idlogo.src=logouri;
})();