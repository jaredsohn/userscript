// ==UserScript==
// @name          Scribd viewer remover
// @namespace     http://userscripts.org/users/74427
// @description   This script removes that annoying flash viewer from scribd
// @include       http://www.scribd.com/doc/*
// ==/UserScript==
var viewer = document.getElementById('viewer_document')
viewer.parentNode.removeChild(viewer);
