// ==UserScript==
// @name       Di top border remover
// @namespace  lundgren
// @version    0.1
// @description  Removes the highly annoying top border on di.se
// @match      http://*.di.se/*
// @copyright  2013+, lundgren
// ==/UserScript==


var frameSets = document.getElementsByTagName("frameset");
if (frameSets.length > 0) {
    frameSets[0].rows = "0,0,*";
}