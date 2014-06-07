// ==UserScript==
// @name        lfgcomic.com Remove Bars
// @namespace   http://userscripts.org/users/549408
// @include     http://www.lfgcomic.com/*
// @version     1
// @grant       none

document.getElementById("special-header").remove();
document.getElementById("header").remove();
document.body.setAttribute('style', 'margin-top: 0px !important; background-position: center 0px !important;' );
document.getElementById("sidebar").remove();
document.getElementById("footer").remove();
document.getElementById("menu").style.width="810px";
document.getElementById("page").style.width="792px";
document.getElementsByClassName("content")[0].remove();
// ==/UserScript==

