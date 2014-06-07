// ==UserScript== 
// @name           nCore Phoenix Design by Anonymous83 & FuRiOn, userscript by galactica132
// @namespace      Style created By Anonymous83 & FuRiOn, userscript by galactica132
// @description    Phoenix Design nCore-ra
// @include        http://ncore.cc/*
// @include        http://ncore.nu/*
// ==/UserScript== 
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://ustyles.ez.lv/phoenix/phoenix.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);