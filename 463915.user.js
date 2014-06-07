// ==UserScript==
// @name        I&I-disable-fixed-toolbar
// @namespace   amynbe
// @description désactive la barre d'outil supérieure fixe
// @include     http://www.islametinfo.fr/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==
GM_addStyle('#toolbar-block { position: static; }');
