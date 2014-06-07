// ==UserScript==
// @name           GertrudaToGlagne
// @description    Changes gertruda link to the main page of d3.ru
// @author         shock_one
// @license        MIT
// @version        0.1
// @include        http://*.d3.ru/*
// @icon           http://d3.ru/favicon.ico
// ==/UserScript==

document.getElementsByClassName("b-gertruda").item(0).getElementsByTagName("a").item(0).href = "http://d3.ru";