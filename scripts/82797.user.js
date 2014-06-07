// ==UserScript==
// @name          HV Title
// @namespace     
// @include       http://foorum.hinnavaatlus.ee/*
// ==/UserScript==
var old_title = document.title;
var new_title = old_title.replace("Hinnavaatluse Foorumid :: ", "");
new_title = new_title.replace("vaata teemat - ", "");
document.title = new_title
