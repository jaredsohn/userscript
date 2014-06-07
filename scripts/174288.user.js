// ==UserScript==
// @name        GTAForums Quote De-Imager
// @namespace   ALMOST610
// @description Removes/Shrinks Images In Quotes.
// @updateURL   https://userscripts.org/scripts/source/174288.meta.js
// @downloadURL https://userscripts.org/scripts/source/174288.user.js
// @homepageURL https://userscripts.org/scripts/show/174288
// @icon        http://s3.amazonaws.com/uso_ss/icon/167331/large.png?1368345852
// @include     http://www.gtaforums.com/*
// @version     1.0
// ==/UserScript==

var css = "#quote img { border:#3D6192 solid 2px; max-height:40px; max-width:120px;} #quote img:hover { border:none; max-height:inherit; max-width:inherit;} #quote img[src^='http://media.gtanet.com/'] {border:none;display:inherit}";


var htmlDiv = document.createElement('div');
htmlDiv.innerHTML = '<p>foo</p><style>' + css + '</style>';
document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);

