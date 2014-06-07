// ==UserScript== 
// @name               Twitter icoon verbergen
// @namespace          http://www.mijnmaffia.nl/underwar
// @include            http://*.mijnmaffia.*/underwar/*
// @include            http://*.mijnmaffia.*/underwar
// ==/UserScript== 


var classes = document.getElementsByClassName("Twitter_icon"); 
classes[0].style.display = "none"; 
