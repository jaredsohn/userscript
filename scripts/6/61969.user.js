// ==UserScript==
// @name           web.de navigation killer
// @include        https://freemail*.web.de/*
// ==/UserScript==

function remove_node_id(id) {
    	var el = document.getElementById(id);
    	if (el) {
    		el.parentNode.removeChild(el);
    	}
}

remove_node_id("navigator");

	var el = document.getElementById("canvas");
	el.style.top = "1px";
	el.style.overflow = "auto";
	el.style.position = "auto";
	
	

