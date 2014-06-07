// ==UserScript==
// @name       gplus_fixed_top
// @namespace  gplus_fixed_top
// @version    v1.0
/* @reason
 * set google plus's top and navigation panels fixed
 * inpired by gplus_fixed_panel : http://userscripts.org/scripts/show/105831
 * @end
 */
// @match     https://plus.google.com/*
// @author    yann@harakys.com
// @homepage  http://userscripts.org/scripts/show/107170
//
// ==/UserScript==

var top_panel = document.getElementsByClassName("a-Eo-T")[0];
top_panel.style.position = "fixed";
top_panel.style.width = "100%";

var nav_panel = document.getElementsByClassName("a-U-T")[0];
nav_panel.style.position = "fixed";
nav_panel.style.paddingTop = "20px";
nav_panel.style.height = "50px";
nav_panel.style.zIndex = 100;

var content_panel = document.getElementById("content");
content_panel.style.paddingTop = "70px";
