// ==UserScript==
// @name          YouTube windowed fullscreen
// @version       0.1
// @namespace     http://erichlotto.com/projects
// @description   Adds a link on Youtube to view the currently playing video in windowed fullscreen
// @include       http://www.youtube.com/*
// ==/UserScript==

var separayt = location.href.split("=");
var separayt2 = separayt[1].split("&");
var urlcompactada = separayt2[0]
document.getElementById('watch-headline-user-info').innerHTML += '<b> <a target="_self" href="http://www.youtube.com/v/'+ urlcompactada + '&fmt=18" title="Open Video in windowed Fullscreen">W.F.S.</a></b>';