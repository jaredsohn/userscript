// ==UserScript==
// @name           Like - FB
// @namespace      stamdard
// @include        http://www.facebook.com/*
// ==/UserScript==

var spans = document.getElementsByTagName("span");
for(var i=0;i<spans.length;++i){
	if(spans[i].innerHTML == "Tetszik "){
		spans[i].innerHTML = "Like ";
	}
}