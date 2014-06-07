// ==UserScript==
// @name        YouBoob
// @namespace   *
// @include     http://www.youtube.com/*
// @version     1.1
// ==/UserScript==

// Changelog:
//   Updated to higher res image. Enjoy.

mypic = document.createElement('img');

mypic.setAttribute("src", "http://i4.photobucket.com/albums/y128/nick53182/nice_tits.png");
mypic.setAttribute("id", "bewbs");

document.body.appendChild(mypic);

GM_addStyle( "img#bewbs { position:fixed; top:0px; left: 75%; height: 100%; width:auto; z-index: -1; }" );