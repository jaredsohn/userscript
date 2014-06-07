// ==UserScript== 
// @name         Travian Fix css
// @description  Travian Fix css
// @namespace    Tranvian
// @version      1.0
// @include      http://*.travian.hk/*
// @homepage
// ==/UserScript==


var link1 = document.createElement('link');
var link2 = document.createElement('link');
var link3 = document.createElement('link');
var link4 = document.createElement('link');
link1.href = 'gpack/travian_basic/lang/hk/compact.css?13fb3';
link1.rel = 'stylesheet';
link1.type = 'text/css';
link2.href = 'gpack/travian_basic/lang/hk/lang.css?13fb3';
link2.rel = 'stylesheet';
link2.type = 'text/css';
link3.href = 'gpack/travian_redesign/travian.css?13fb3';
link3.rel = 'stylesheet';
link3.type = 'text/css';
link4.href = 'gpack/travian_redesign/lang/hk/lang.css?13fb3';
link4.rel = 'stylesheet';
link4.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(link1);
document.getElementsByTagName('head')[0].appendChild(link2);
document.getElementsByTagName('head')[0].appendChild(link3);
document.getElementsByTagName('head')[0].appendChild(link4);


