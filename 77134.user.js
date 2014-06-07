// ==UserScript==
// @name           PhotoShelter Picture Protection Remover
// @namespace      http://userscripts.org/users/111324
// @description    Removes the mis-feature on photoshelter.com that prevents users from saving images
// @include        http://www.photoshelter.com/*
// @version        0.1
// @license        Public Domain
// ==/UserScript==

var elems = document.getElementsByClassName("imgMaskPSNQO");
var i;
for (i = 0; i < elems.length; i += 1) {
    elems[i].parentNode.removeChild(elems[i]);
}
