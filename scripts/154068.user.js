// ==UserScript==
// @name           WKW_PictureSliderRemover
// @author         Agriculturalist
// @version	   0.1
// @namespace      *
// @include        http://www.wer-kennt-wen.de/*
// @grant	   none
// ==/UserScript==


var parent1 = document.getElementById("content");
var parent2 = document.getElementById("sidebar");

var child1 = document.getElementById("pictureSliderTabs");

// CONTENT
parent1.removeChild(child1);