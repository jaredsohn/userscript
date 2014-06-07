// ==UserScript==
// @name        Linkleri Yeni Sekmede
// @namespace   tumblr
// @description Adds target="_blank" to links on Tumblr
// @include     *userscripts.org/scripts/show/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var x = document.getElementsByTagName('a');

for(var i=0;i<x.length;i++)
{
    x[i].setAttribute('target','_blank');
}