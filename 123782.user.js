// ==UserScript==
// @name           500px
// @namespace      500px
// @include        http://500px.com/photo/*
// ==/UserScript==

var pic = document.getElementById("mainphoto");

var newpic = document.createElement("img");
newpic.src = pic.src

var placeToAdd = document.getElementById("content");
placeToAdd.insertBefore(newpic, placeToAdd.firstChild);

pic.parentNode.removeChild(pic);