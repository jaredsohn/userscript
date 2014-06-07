// ==UserScript==
// @name           stop ird.govt.nz opening new tabs for every bloody link!
// @description    stop ird.govt.nz opening new tabs for every bloody link!
// @include        http://*ird.govt.nz/*
// @include        https://*ird.govt.nz/*
// ==/UserScript==

$('a[target="_blank"]').removeAttr('target');