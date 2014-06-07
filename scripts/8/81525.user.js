// ==UserScript==
// @name           Typing Challenge Cheat
// @namespace      http://userscripts.org/users/gizmostudios/
// @description    Get a perfect score!
// @include        http://174.129.34.42/*
// ==/UserScript==

var input;
var preview;
var current;
var timer;
var interval;

if(!interval){
	interval = setInterval(function(){
		input = document.getElementById("input");
		preview = document.getElementById("preview");
		timer = document.getElementById("timer");

		if(preview.childNodes.length > 0){
			if(timer.firstChild.nodeValue > 0){
				getWord();
			} else {
				clearInterval(timer);
			}
		}
	}, 150);
}

function getWord(){
	for(i in preview.childNodes){
		if(preview.childNodes[i].className == "current"){
			
			var c = preview.childNodes[i].firstChild.nodeValue;
			if(c != current){
				current = c;
				typeWord(current);
			}
		}
	}
}

function typeWord(w){
	for(var i = 0; i < String(w).length; i++){
		var letter = w.charAt(i);
		input.value += letter;
	}
}