// ==UserScript==
// @name        Webcomic hotkeys
// @namespace   lfghk
// @include     *www.lfgcomic.com/*
// @include     *nuklearpower.com/*
// @include     *goblinscomic.org/*
// @version     0.1
// @grant       David
// ==/UserScript==
var btnNext;
var btnPrev;
if (window.location.hostname.contains('nuklearpower')) {
 btnNext = document.getElementsByClassName("navbar-next")[0].getElementsByTagName("a")[0];
 btnPrev = document.getElementsByClassName("navbar-previous")[0].getElementsByTagName("a")[0];
}
if (window.location.hostname.contains('goblinscomic')) {
    btnNext = document.getElementsByClassName("nav-next")[0].getElementsByTagName("a")[0];
    btnPrev = document.getElementsByClassName("nav-previous")[0].getElementsByTagName("a")[0];
}
if (window.location.hostname.contains('lfgcomic')) {
 btnNext = document.getElementById('nav-next');
 btnPrev = document.getElementById('nav-prev');
}

if (document.addEventListener) {
    document.addEventListener("keyup", onKeyUp, false);
} else {
    document.onkeyup = onKeyUp;
}
function onKeyUp(evt) {
  if (evt = evt ? evt : window.event ? event : null) {
    switch (evt.keyCode) {
      case 39: //next
        btnNext.click(); break;
    case 37: //prev
        btnPrev.click(); break;
    }
  }
}
