// ==UserScript==
// @name        ShareNXS Direct to Original
// @namespace   ShareNXS Direct to Original
// @include     http://sharenxs.com/view/*
// @version     1
// ==/UserScript==


loca = new String(window.location + "&offset=original");

location.replace(loca);