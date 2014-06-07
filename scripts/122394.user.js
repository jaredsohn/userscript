// ==UserScript==
// @name            HackForums Left Aligner
// @namespace       xerotic/imagechanger
// @description     Removes HF right-aligned text.
// @include         http://supportforums.net/*
// @include         http://www.supportforums.net/*
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