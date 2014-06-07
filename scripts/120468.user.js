// ==UserScript==
// @name       AdStop by Kazz
// @namespace  null
// @version    1.1
// @description  Block all ads on Ogame (ver. 4.0.0).
// @include    http://*.ogame.*/*
// @copyright  2011+, Kazz3m
// ==/UserScript==

document.getElementById('mmonetbar').style.display='none';
document.getElementById('banner_skyscraper').style.display='none';
document.getElementById('siteFooter').style.display='none';
var c1 = document.getElementsByClassName('contentBoxBody');
c1[0].style.top='0px';
var c1 = document.getElementsByClassName('content-box-s');
if(c1[3] != undefined) c1[3].style.display='none';
var c1 = document.getElementsByClassName('content-box-m');
if(c1[0] != undefined) c1[0].style.display='none';
var c1 = document.getElementsByClassName('build-faster tipsStandardMax research');
if(c1[0] != undefined) c1[0].style.display='none';