// ==UserScript==
// @name           Which: fix slow opacity bug
// @namespace      http://raines.me.uk/
// @description    Which.co.uk renders very slowly on Firefox 3 on Ubuntu because the body opacity is set to 0.9999.
// @include        http://www.which.co.uk/*
// @include        https://www.which.co.uk/*
// ==/UserScript==

document.body.style.opacity = 1;

