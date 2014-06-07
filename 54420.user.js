// ==UserScript==
// @name           Metropol.se inline image enlarger
// @namespace      http://henrik.nyh.se
// @description    On the Metropol.se auction site, replaces thumbnails and the detail view image with larger images inline.
// @include        http://www.metropol.se/*
// ==/UserScript==

Array.prototype.slice.call(document.images).forEach(function(img) {
  img.src = img.src.replace('/imagebank/thumbs/', '/imagebank/larges/');
  img.className = "GM_image";
});

// Thumbnails
GM_addStyle(' img.GM_image { max-width: 200px; } ');
// Detail image
GM_addStyle(' td[width="140"] a[href^="javascript:oppna"] img { max-width: 380px; } ');
