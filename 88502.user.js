// ==UserScript==
// @name           jQuery Include
// @namespace      jQuery Include
// @include        http://*
// @author         Guilherme Nagatomo
// ==/UserScript==

function inserirJquery(){
	var j = document.createElement("script");
	var h = document.getElementsByTagName("head");
	j.setAttribute("type", "text/javascript");
	j.setAttribute("name", "jQueryInclude");
	j.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	h[0].appendChild(j);
	
	if(!jQuery){
		inserirJquery();
	}
}

inserirJquery();