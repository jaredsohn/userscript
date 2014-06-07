// ==UserScript==
// @name            HackForums Left Aligner
// @namespace       cn/imagechanger
// @description     Removes HF right-aligned text.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0
// ==/UserScript==



var divs = document.getElementsByTagName('div');
var e;
for(var i=0;i<divs.length;i++) {
	e = divs[i];
	if(e.style.textAlign == "right"){
		e.style.textAlign = "left";
	}
}