// ==UserScript==
// @name           Remove_Tanga_BGG
// @namespace      http://mallgur.com
// @description    Remove a parte de anúncio de Tanga nas páginas do BGG - Removes the Tanga ads from BGG page
// @grant          none
// @include        http://boardgamegeek.com/*
// ==/UserScript==

var elmDeleted = document.getElementById("simpleCarousel");
elmDeleted.parentNode.removeChild(elmDeleted);

// Created by Mallgur - 2011
// Updated June 2013 to change from tanga ads to all on the left bar carrousel