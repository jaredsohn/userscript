// ==UserScript==
// @name           Remove Image Alt text
// @description    Remove Image's Alt text
// @include        http://*
// ==/UserScript==

/* Removes the alt text of images(useful when disabling images)

var t=document.getElementsByTagName('img');for(i=0;i<t.length;i++){void(t[i].alt = "");}