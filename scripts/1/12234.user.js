// ==UserScript==
// @name           Orkut Photo Customiser
// @author         Adauto (Portuguese version)
// @author	   Bean (English Version)
// @namespace      http://orkutaddons.blogspot.com/
// @description    It Customizes The Orkut "Who Do You Know?" Photo, as per YOUR NEEDS!!
// @include        http*://www.orkut.com/GLogin.aspx*
// ==/UserScript==

/*
====================================================
How To Use The Script
====================================================

First, host your photos some where, like www.imageshark.us then enter The Photo Links below

*/

//Enter The Photo Links below

fotos = [
       "http://i213.photobucket.com/albums/cc58/simon7997/8.jpg",
       "http://i213.photobucket.com/albums/cc58/simon7997/4.jpg"
       ];

document.images[3].src=fotos[Math.floor(Math.random()*fotos.length)];