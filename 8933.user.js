// ==UserScript==
// @name          TK Ads Killer
// @author	  Locke06037 - Locke Cole
// @description   kills dot TK ads
// @include       *
// @exclude       file://*
// ==/UserScript==


function locked_on() 
{ 
    var layer = document.getElementById('adLayer');
    layer.style.visibility = 'hidden';
}

locked_on();