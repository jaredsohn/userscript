// ==UserScript==
// @name            HackForums Default Text
// @namespace       tableflipper/defaulttext
// @description     Makes all text default
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @include         www.hackforums.net/*
// @include         hackforums.net/*
// @version         1.0
// ==/UserScript==
// Thanks to Xerotic for the code base.
var divs = document.getElementsByTagName('div');
var f;

for(var j=0;j<divs.length;j++){
	f = divs[j];
	if(f.id.indexOf("pid_") != -1){
		var span = document.getElementsByTagName("span");
		var e;
		for(var i=0;i<span.length;i++) {
			e = span[i];
			e.style.fontFamily = "";
			if (!(e.style.color == "rgb(0, 102, 255)" || e.style.color == "rgb(255, 204, 0)")){
				e.style.color = "";
			}
			e.style.fontSize = "";
			e.style.textAlign = "left";
		}	
	}
}