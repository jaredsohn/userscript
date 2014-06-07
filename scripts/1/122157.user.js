// ==UserScript==
// @name Wikipedia Page ID Display
// @namespace http://www.moomat.com/
// @description Displays Wikipedia's Page IDs
// @include http://*.wikipedia.org/wiki/*
// ==/UserScript==

var scr = document.createElement("script");
scr.setAttribute("type", "application/javascript");
scr.textContent = "var article_id = mw.config.get('wgArticleId');  var site_sub = document.getElementById('siteSub');  if(article_id && site_sub) { var new_val = site_sub.innerHTML + ' / Article ID: ' + article_id;  site_sub.innerHTML = new_val; }";
document.body.appendChild(scr);