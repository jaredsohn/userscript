// ==UserScript==
// @name           Experts-Exchange Fixer
// @namespace      http://lachlanarthur.com
// @description    Removes the content between the question and the answers.
// @include        http://www.experts-exchange.com/*
// ==/UserScript==

var new_style = document.createElement("link");
new_style.setAttribute("rel", "stylesheet");
new_style.setAttribute("href", "http://lach.la/userscripts/experts.css");
document.head.appendChild(new_style);