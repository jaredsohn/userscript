// ==UserScript==
// @name		Leprosorium youtube link converter
// @namespace		http://leprosorium.ru/
// @author		MJ
// @include		http://*.leprosorium.ru/*
// @include		http://leprosorium.ru/*
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
for(var i = 0, a; a = anchors[i]; ++i){
	if(a.href.search(/youtube\.com\/watch\?v=/) == -1 || a.parentNode.className == "Quote") continue;
	
	var id = (a.href.search(/&/) != -1) ? a.href.slice(a.href.search(/=/) + 1, a.href.search(/&/)) : a.href.slice(a.href.search(/=/) + 1);
		
	var obj = document.createElement('object');
	obj.width = 640; obj.height = 385;
	obj.innerHTML = '<param value="http://www.youtube.com/v/' + id + '" name="movie"/><param value="transparent" name="wmode"/><embed width="640" height="385" wmode="transparent" type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + id + '"/><a href="http://www.youtube.com/v/' + id + '" />';
	a.parentNode.insertBefore(obj,a);
	a.parentNode.removeChild(a);
}
