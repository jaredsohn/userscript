// ==UserScript==
// @name           MilliyetGaleriGezer
// @namespace      MilliyetGaleriGezer
// @include        http://www.milliyet.com.tr/content/galeri/yeni/*
// ==/UserScript==
window.addEventListener("load",function() {
		var b = document.getElementsByTagName("body")[0];
		var inp = document.createElement("input");
		inp.setAttribute("type","text");
		inp.setAttribute("id","txtMilliyet");
		inp.setAttribute("style","display:none");
		b.appendChild(inp);
		document.getElementById("txtMilliyet").focus();
	}
,false);

window.addEventListener("keydown",function(e) {
	var nextUrl = "#";
    var prewUrl = "#";
	var g = document.getElementsByTagName("a");
	for(var i=0;i<g.length;i++){
		if(g[i].innerHTML=="Sonraki") {
			nextUrl = g[i].getAttribute("href");
		}
		if(g[i].innerHTML=="Önceki") {
			prewUrl = g[i].getAttribute("href");
		}
	}
	if(e.keyCode==75){ // k
		if(nextUrl!="#")
			document.location = nextUrl;
	}
	
	if(e.keyCode==74){ // j
		if(prewUrl!="#")
			document.location = prewUrl;
	}
}, false);
 