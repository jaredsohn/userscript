// ==UserScript==
// @name           UniformStyles
// @description    Disables custom stylesheets on subdirties.
// @author         shock_one
// @license        MIT
// @version        0.1
// @include        http://*.d3.ru/*
// @icon           http://d3.ru/favicon.ico
// ==/UserScript==

document.styleSheets.item(3).disabled=true;