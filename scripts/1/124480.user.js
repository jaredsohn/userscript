//==U// ==UserScript==
// @name        404 Not Found - Error
// @author      Kevin Zucchini
// @version     0.11
// @namespace   stoof
// @description A harmless prank so that every page says "404 not found"
// @include	*.*
// ==/UserScript==
document.clear();
document.open();
document.write("<h1>404 Not Found - Error");
document.close();