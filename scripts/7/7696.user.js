// ==UserScript==
// @name          userscripts.org - View Script Source
// @namespace     http://loucypher.wordpress.com/
// @include       http://userscripts.org/scripts/show/*
// @description	  Add "View script source" button before the "Install this script" button
// ==/UserScript==

var xpath = "//a[@class='button']//parent::p";
var instButton = document.evaluate(xpath, document, null, 0, null)
                         .iterateNext();

if (!instButton) return;

var viewButton = instButton.cloneNode(true);
viewButton.firstChild.textContent = "View script source";

//viewButton.firstChild.href = viewButton.firstChild
//                                       .href.replace(/\.user\.js/, "");

viewButton.firstChild.href += "?source"; // as Henrik Nyh suggested

instButton.parentNode.insertBefore(viewButton, instButton);

