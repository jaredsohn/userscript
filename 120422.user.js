// ==UserScript==
// @name            HackForums Turn Text Yellow
// @namespace       xerotic/yellower
// @description     Yellows text.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0
// ==/UserScript==



var divs = document.getElementsByTagName('div');
var e;
var f;
var spanArray = new Array();
for(var j=0;j<divs.length;j++){
	f = divs[j];
	if(f.id.indexOf("pid_") != -1){
		var spans = f.getElementsByTagName('span');
		for(var i=0;i<spans.length;i++) {
			e = spans[i];
			if(e.style.fontSize != ""){
				if(e.style.color.length < 3){
					spanArray[i] = "yellow";
				} else {
					spanArray[i] = e.style.color;
				}
			}
		}
		f.style.color = "yellow";
		for(var i=0;i<spans.length;i++) {
			e = spans[i];
			if(e.style.fontSize != ""){
				e.style.color = spanArray[i];
			}
		}
		
	}
}