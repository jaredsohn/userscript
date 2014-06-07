// ==UserScript==
// @name       Highlight waffleimages links
// @namespace  http://mathemaniac.org
// @version    1.0
// @description  Highlights WaffleImages links on SA
// @match      http://forums.somethingawful.com/*
// @copyright  2013, Sebastian Paaske Tørholm
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

$("img[src*='img.waffleimages.com']").css( { "border": "3px solid orange" } ).after("<div style='color: orange'>(WaffleImages)</div>");