// ==UserScript==
// @name           PHPWind Grabage Watermark Remover
// @namespace      freewizard@
// @description    remove phpwind forum's grabage watermark
// @include        http://www.war-sky.com/forum/htm_data/*
// ==/UserScript==

var cells = document.body.getElementsByTagName("span");
for (var i = 0; i < cells.length; i++) {
    var status = cells.style.display;
    if ( status == "none") {
    cells.innerHTML = '';
    }
}