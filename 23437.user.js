// ==UserScript==
// @name studivz imagemenu
// @description re-enables the context menu on studivz images
// @include http://www.schuelervz.net/PhotoAlbums/Photo/*
// @include http://www.studivz.net/PhotoAlbums/Photo/*
// ==/UserScript==

var image = document.evaluate("id('PhotoContainer')/img",document,null,
			      XPathResult.FIRST_ORDERED_NODE_TYPE,null)
    .singleNodeValue;

image.setAttribute("onmousedown","");
