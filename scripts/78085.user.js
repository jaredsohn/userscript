// ==UserScript==
// @name           Loki Schnitzel-Blocker
// @namespace      http://localhost
// @include        http://www.lokalisten.de/*
// ==/UserScript==

function blockSchnitzel(){
	var pattern = /csh\.php/;
	for(var i=0;i<document.body.childNodes.length;i++){
		for(var j=0;j<document.body.childNodes[i].childNodes.length;j++){
			if(pattern.test(document.body.childNodes[i].childNodes[j].action) == true){
				document.body.childNodes[i].style.cssText = "position: absolute; top: 20px; left: 20px; display: block;";
			}
		}
	}
}

blockSchnitzel();