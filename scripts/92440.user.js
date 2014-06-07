// ==UserScript==
// @name           YouTube Golden Logo
// @version        1.1
// @author         ArpitNext
// @namespace      http://blog.arpitnext.com/
// @description    Displays golden logo on youtube.com
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @run-at         document-start
// ==/UserScript==


(function () {
var idlogo = document.getElementById('logo');
logouri = "http://lh5.ggpht.com/_5zwVCHZ-oII/TQKjGFV6YII/AAAAAAAAAC0/tovbI2O18xc/s800/golden.jpg";
idlogo.alt="YouTube home - Golden logo for great explorers of the golden topics";
idlogo.class="noni";
idlogo.src=logouri;
})();
