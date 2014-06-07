// ==UserScript==
// @name           USO Monsterized
// @namespace      http://userscripts.org/users/28612
// @description    Change Gravatar identicon to monsterid
// @include        http://userscripts.org/*
// ==/UserScript==

//http://en.gravatar.com/site/implement/url
//identicon monsterid wavatar
Array.forEach(document.images,function(image){if (image.src.indexOf("identicon")!=-1) image.src=image.src.replace("identicon","monsterid");});