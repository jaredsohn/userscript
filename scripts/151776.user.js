// ==UserScript==
// @name        Projanmo Forum Font Selector
// @namespace   http://forum.projanmo.com
// @description Projanmo Forum Font Selector
// @updateURL https://userscripts.org/scripts/source/151776.user.js
// @downloadURL https://userscripts.org/scripts/source/151776.user.js
// @match http://forum.projanmo.com/*
// @version     1
// ==/UserScript==

var font_panel = document.createElement("div");
font_panel.id = "font_panel_div";
font_panel.style.position = "fixed";
font_panel.style.top = "10px";
font_panel.style.right = "5px";
font_panel.style.color = "olive";
font_panel.style.boxShadow = "-5px 5px 10px grey";
font_panel.style.borderRadius = "25px";
font_panel.style.padding = "10px";
font_panel.innerHTML = "<span style = 'display:block;cursor:pointer;margin-right:10px' onclick = 'document.getElementsByClassName(\"brd-page\")[0].style.fontFamily = \"Siyam Rupali\"'>Siyam Rupali</span><span style = 'cursor:pointer;margin-right:10px' onclick = 'document.getElementsByClassName(\"brd-page\")[0].style.fontFamily = \"Solaimanlipi\"'>Solaimanlipi</span>";
document.getElementById("brd-wrap").appendChild(font_panel);