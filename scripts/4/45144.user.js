// ==UserScript==
// @name           MyPublicPix View Picture
// @namespace      http://www.mypublicpix.com/upload/*
// @include        http://www.mypublicpix.com/upload/*
// @description    Cleans the clutter on MyPublicPix picture pages. Based on: Free Faler Imagebam view picture
// ==/UserScript==

var sImgSrc = document.getElementById('thepic').src;
window.location.href = sImgSrc;