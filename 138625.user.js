// ==UserScript==
// @name           Codecademy Resizeable Code
// @description    Adds jQuery resizable to editor
// @namespace      http://chrisneetz.com
// @include        http://www.codecademy.com/courses/*
// ==/UserScript==


$('#editor').resizable({ alsoResize: ".ace_scroller, .ace_editor, .ace_content, .ace_sb, .ace_print_margin_layer", handles: "n, s" });
