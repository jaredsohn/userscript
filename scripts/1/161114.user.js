// ==UserScript==
// @name           scrumySeperate
// @namespace      TAT
// @description    Seperate the rows on scrumy projects
// @author         Thomas "TAT" Andresen
// @include        https://scrumy.com/*
// @version        1.1
// ==/UserScript==

var a = document.createElement("style")
a.type = "text/css";
a.textContent = "table#scrumy-board th, table#scrumy-board td { border-width: 0px 1px 1px 0px; border-bottom-color: #CCC }";
document.head.appendChild(a);