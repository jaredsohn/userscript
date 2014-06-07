// ==UserScript==
// @name          Dirty Reload
// @namespace     http://dirty.ru/
// @description   dirty script
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*

// ==/UserScript==


function load()

{


var d = document.getElementById('copy');
if( d == null){window.location.reload()}

}

window.onload = setTimeout(load,2000);



