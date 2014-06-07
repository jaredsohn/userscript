// ==UserScript==
// @name          飞赞改造器
// @namespace     http://www.feizan.com/*
// @version	      v1.1
// @include       http://www.feizan.com/*
// ==/UserScript==

var fzFunction = function(){
	document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.width = "100%";
        document.getElementById("header").style.zIndex = "20";
        document.getElementById("searchbar").style.paddingTop = "50px";
}

function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval( fzFunction );