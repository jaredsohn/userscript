// ==UserScript==
// @name        Tumblr's target="_blank"
// @namespace   tumblr
// @description Adds target="_blank" to links on Tumblr
// @include     *.tumblr.com*
// @include     http://*.tumblr.com*
// @include     http://*.tumblr.com/*
// @include     *://*.tumblr.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var x = document.getElementsByTagName('a');

for(var i=0;i<x.length;i++)
{
    x[i].setAttribute('target','_new');
}