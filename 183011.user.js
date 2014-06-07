// ==UserScript==
// @name        Motor-Talk hide forum header image
// @namespace   ms.mt.forum.header.hide
// @description Motor-Talk hide forum header image
// @include     http://www.motor-talk.de/forum/*
// @version     1
// @grant       none
// ==/UserScript==

var tabNavVisual = document.getElementById('tabnavvisual');
tabNavVisual.style.display = 'none';

var tabIntro = document.getElementById('tabintro');
tabIntro.style.margin = '0px 0px 0px';