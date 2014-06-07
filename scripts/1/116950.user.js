// ==UserScript==
// @name          Google Reader: compact and less depressing
// @author        balver
// @namespace     balver.freehost.pl
// @license       Creative Commons Attribution-ShareAlike 3.0
// @version       2012.12.08.1
// @description   This CSS tweak will make Google Reader's new look more compact and less depressing by adding some eye-friendly green colors. Inspired by lipsumar's "Google Reader compact" and Green Sky GMail theme.
// @include       http*://www.google.*/reader/view/*
// @homepage      http://userscripts.org/scripts/show/116950
// @updateURL     https://userscripts.org/scripts/source/116950.meta.js
// @icon          http://s3.amazonaws.com/uso_ss/icon/116950/large.png
// @resource      cssStatic http://abyss.i234.me/userscripts/116950/static.css
// @resource      cssNoSearchBar http://abyss.i234.me/userscripts/116950/no-search-bar.css
// @resource      cssIcons http://abyss.i234.me/userscripts/116950/icons.css
// ==/UserScript==

// VARIABLES TO PLAY WITH
// backgrounds
color1 = "#D4EDC9";
// frame, left menu backgrounds, button border
color2 = "#A9DA92";
// button bottom gradient (color1: rgb-3hex)
color3 = "#D1EAC6";
// button bottom gradient on hover (color1: rgb-12hex)
color4 = "#97C880";
// button border on hover (color4: rgb-12hex)
color5 = "#85B65E";
// background color of read entry
color6 = "#F5FCF3";
// current entry background color
color7 = color1;
// if you want to switch the icons to the gray ones introduced by Google in November, change it from "no" to "yes"
IWantUglyIcons = "no";
// if you don't use search bar, change it to "no". Warning! It conflicts with Google Reader Filter userscript
IUseSearchBar = "yes";

// DON'T TOUCH CODE BELOW IF YOU DON'T KNOW WHAT YOU'RE DOING
var cssStatic = GM_getResourceText("cssStatic");
var cssNoSearchBar = GM_getResourceText("cssNoSearchBar");
var cssIcons = GM_getResourceText("cssIcons");

var cssDynamic = "#entries.list .read .collapsed { background: " + color6 + " }" +
  "#entries.list #current-entry .collapsed { background: " + color7 + " }" +
  "#entries.list #current-entry.expanded .collapsed { background: " + color7 + "; height: 21px; }" +
  "#entries.list #current-entry.expanded.read .collapsed { background: " + color7 + "; }" +
  "#title-and-status-holder {" +
  "  padding: 0.5ex 0 0 0.5em !important;" +
  "  background-color: " + color1 + ";" +
  "  margin-right: 0;" +
  "}" +
  "#viewer-container { border: 5px solid " + color2 + "; }" +
  "#sections-header {" +
  "  background-color: " + color1 + ";" +
  "  margin-bottom: 0;" +
  "}" +
  ".lhn-section-secondary li a.tree-link-selected," +
  "#lhn-selectors .selector.selected," +
  ".lhn-section-primary.tree-link-selected," +
  ".lhn-section-secondary li.folder.tree-selected a.tree-link-selected," +
  "#overview-selector.selected {" +
  "  border-left: 3px solid " + color2 + ";" +
  "  background-color: " + color2 + ";" +
  "}" +
  "a:hover.tree-link-selected .tree-item-action-container, .scroll-tree li a.menu-open {" +
  "  background-color: " + color2 + ";" +
  "}" +
  "#scrollable-sections-top-shadow { border-top: 1px solid " + color2 + "; }" +
  "#scrollable-sections-bottom-shadow { border-bottom: 1px solid " + color2 + "; }" +
  ".jfk-button-primary {" +
  "  background-color: " + color1 + ";" +
  "  background-image: -moz-linear-gradient(center top, " + color1 + ", " + color3 + ");" +
  "  color: #444444;" +
  "  border: 1px solid " + color2 + ";" +
  "}" +
  ".jfk-button-primary.jfk-button-hover {" +
  "  background-color: " + color2 + ";" +
  "  background-image: -moz-linear-gradient(center top, " + color2 + ", " + color4 + ");" +
  "  color: #444444;" +
  "  border: 1px solid " + color5 + ";" +
  "}" +
  "#entries.list #current-entry.expanded .entry-actions {" +
  "  border-bottom: 1px solid " + color2 + " !important;" +
  "  padding-bottom: 1px !important;" +
  "}" +
  "#entries.list .entry .entry-actions { padding: 1px 0 0 4px !important; background: " + color1 + "; }" +
  ".card-common .card-actions { height: auto !important; background: " + color1 + ";}"

GM_addStyle(cssStatic);
GM_addStyle(cssDynamic);

if (IWantUglyIcons == "no") {
  GM_addStyle(cssIcons);
}

if (IUseSearchBar == "no") {
  GM_addStyle(cssNoSearchBar);
}
