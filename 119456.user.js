// ==UserScript==
// @name           imdbEnableSavePhoto
// @namespace      bitsscream
// @description    Enables you to save photos on imdb.com
// @include        http://www.imdb.com/media/*
// ==/UserScript==

var photoContainer=document.getElementById("photo-container");
var images=photoContainer.getElementsByTagName('img');
for (i=0;i<images.length;i++)
{
	images[i].removeAttribute('oncontextmenu');
}
