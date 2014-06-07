// ==UserScript==
// @name       Ad Blocker on Noblesse Xooit
// @version    1.0.0-beta1
// @description  Blocks These fakin ads
// @match      http://noblesse-oblige.xooit.fr/*
// @copyright  2012+, Touki
// ==/UserScript==

document.getElementsByTagName("div")[0].outerHTML = '';
if (window.location.href.substr(0,'http://noblesse-oblige.xooit.fr/t'.length) == 'http://noblesse-oblige.xooit.fr/t') {
    var d = document.getElementsByClassName("postbody")[0];
    var fuck = d.getElementsByTagName("div");
    if (fuck.length >= 1) {
        fuck[0].outerHTML = '';
    }
}
