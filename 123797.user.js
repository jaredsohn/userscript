// ==UserScript==
// @name           stormfagScript
// @namespace     stormfagScript
// @include        http://*4chon.net/*
// ==/UserScript==

//Keep the quotes, just change what's in them

var ignore = ["blart","Blart","BLART","Lazare","lazare","LoveandTolerance","Admin"];
var i = 0;

for(i = 0, i < ignore.length; i++){
	replaceAll(ignore[i], "fag")
}

function replaceAll(a, b){
	var s = document.body.innerHTML
	while(s.contains(a)){
		document.body.innerHTML = document.body.innerHTML.replace(a, b)
	}
}