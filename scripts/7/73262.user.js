// ==UserScript==
// @name 4Chan Facebook Remover
// @include http://boards.4chan.org/*
// ==/UserScript==

window.addEventListener("load",

function (a){
document.getElementById('do_facebook').checked = false;
document.getElementById('fb_tr').style.display = 'none';
},false);