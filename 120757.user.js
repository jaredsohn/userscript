// ==UserScript==
// @name            HackForums Default Fonter
// @namespace       xerotic/defaultfonter
// @description     Defaults text all over HF to Verdana.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0
// ==/UserScript==

var spans = document.getElementsByTagName('span');
var f;
for(var i=0;i<spans.length;i++){
	f = spans[i];
	f.style.fontFamily = "";
}