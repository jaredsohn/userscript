// FOD test script
// version 1.0
// 2008-12-07
// Copyright (c) 2008, vindex~
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FOD test script
// @description   adjust FOD appearance and stuff
// @include       http://www.declan-galbraith.com/friendsofdeclan/*
// @include       http://www.friendsofdeclan.co.uk/*
// ==/UserScript==

(function() {
var img = document.getElementsByTagName("img");
img[0].style.width = "100px";
img[0].style.height = "100px";
})();
