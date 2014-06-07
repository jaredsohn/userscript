// ==UserScript==
// @name       UnlimTrah
// @version    0.3
// @description  block popups on trahtube.ru
// @include    http://trahtube.ru/video/*
// @include    http://*.trahtube.ru/video/*
// @copyright  2011+, Dj Arktic
// ==/UserScript==

var vv = document.getElementById('RCommonViewVideo');
var noind = vv.getElementsByTagName('noindex')[0];
noind.innerHTML = "";