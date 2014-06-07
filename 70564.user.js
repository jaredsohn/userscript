// ==UserScript==
// @name   expressz-plusz
// @include *.expressz.hu/*
// @description Az expressz.hu oldalon navigáláskor felugró "menü" eltüntetése
// ==/UserScript==

var text="<style type='text/css'> .hovertip { visibility: hidden; } </style>";
document.getElementsByTagName("head")[0].innerHTML+=text;

