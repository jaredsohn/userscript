// ==UserScript==
// @name           domaci.de
// @namespace      www.anketta.info
// @description    Nema vise cekanja za download!
// @include        http://www.domaci.de/*
// ==/UserScript==

unsafeWindow.c=0;


//sakrij reklame
var reklame=document.getElementsByTagName('center');
reklame[0].style.display='none';

var copyright=document.getElementsByClassName('copyright');
copyright[0].style.display='none';

document.getElementById('position_1').style.display='none';
document.getElementById('position_4').style.display='none';