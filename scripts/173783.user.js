// ==UserScript==
// @name        Ipernity V2 Image Unblocker : One photo
// @namespace   http://www.ipernity.com
// @description Removes the invisible image blocking images on ipernity. Works with the new version of ipernity.
// @include     http://www.ipernity.com/doc/*
// @exclude     http://www.ipernity.com/*/sizes/*
// @version     0.1 (20 July 2013)
// ==/UserScript==


var blockingimage = document.getElementById("zgif");

blockingimage.parentNode.removeChild(blockingimage);