// ==UserScript==
// @name       gplus_fixed_panel
// @namespace  gplus_fixed_panel
// @version    v2.4
/* @reason
 * set google plus's top panel fixed
 * @end
 */
// @match     https://plus.google.com/*
// @author    wonderfuly@gmail.com
// @thankto   Felix Wang
//
// ==/UserScript==

var top_panel = document.getElementsByClassName("a-rg-M")[0];
top_panel.style.position = "fixed";
top_panel.style.width = "100%";
var search_panel = document.getElementsByClassName("a-fa-M")[0];
search_panel.style.paddingTop = "30px";
