// ==UserScript==
// @name           bdb download
// @namespace      Kuzmin @ userscripts.org
// @description    Download images from bilddagboken
// @include        *.bilddagboken.se/p/show.html*
// ==/UserScript==

//============================================
//==            VARIABLE DECLARATION               ==
//============================================
picSrc = document.getElementById("bilden").src;
outputElement = document.getElementById("hiddenInfoLayer");

//============================================
//==          ADD THE LINK TO THE PAGE           ==
//============================================
outputElement.innerHTML+="<span><strong><a href='" + picSrc + "'>DOWNLOAD IMAGE</strong></span>";
