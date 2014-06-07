// ==UserScript==
// @name           Lueshi favicon for endoftheinter.net
// @namespace      http://userscripts.org/scripts/show/43334
// @version        1.0
// @author         Demono
// @description    Uses the old lueshi icon for endoftheinter.net - formally known as luelinks.net
// @include        http://*.endoftheinter.net/*
// @include        http://endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        http://luelinks.net/*
// ==/UserScript==

// Declare a variable and store a <link> element in it
var lueshi = document.createElement("link");

// Define the following attributes for the element and store them into the same variable
lueshi.type = "image/x-icon";
lueshi.rel = "icon";
lueshi.href ="http://endoftheinter.net/favicon.ico";

// Append it to the document as the child of the <head> element
document.getElementsByTagName("head")[0].appendChild(lueshi);