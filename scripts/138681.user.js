// ==UserScript==
// @name        Tarantula.gen.tr için daha kısa başlık.
// @namespace   tarantula.gen.tr
// @include     http://www.tarantula.gen.tr/*
// @include     https://www.tarantula.gen.tr/*
// ==/UserScript==

//--- Delete everything before the first slash (/).
var newTitle    = document.title.replace (/^[^\/]+\/\s*/, "");
document.title  = newTitle;


