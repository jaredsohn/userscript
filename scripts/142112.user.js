// ==UserScript==
// @name        No new window
// @namespace   no-new-window
// @description ...
// @include     htt*://erobank.ru/*
// @version     v0.2
// ==/UserScript==



document.body.innerHTML = document.body.innerHTML.replace(/_blank/g, "_self");


