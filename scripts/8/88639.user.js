// ==UserScript==
// @name           facebook.remove.spam.tag.button!
// @namespace      Phuriphat Boontanon
// @include        http://*.facebook.com/*
// ==/UserScript==

// simple dom ready function.
var domLoaded = function(callback){
	document.addEventListener('DOMContentLoaded', callback, false);
};

(function(){
	// create button function.
	function _button(href){
		var el = document.createElement("div");
		el.style.position = "absolute";
		el.style.top = "20px";
		el.style.left = "10px";
		el.style.background = "#ddd";
		el.style.padding = "10px";
		el.style.fontSize = "14px";
		el.style.borderRadius = "5px";
		el.style.MozBorderRadius = "10px";
		el.style.MozBoxShadow = "0px 0px 2px 2px #aaa";
		el.style.boxShadow = "0px 0px 2px 2px #aaa";
		el.innerHTML = "<a title='Are you in this photo?' href='" + href + "' style='text-decoration: none; color: #000;' >REMOVE ME</a>";
		document.body.appendChild(el);
	}
	// find the remove tag link.
	var atag = document.getElementsByTagName("a");
	for(var i = 0; i < atag.length; i++){
		// get the first link when found.
		if(atag[i].innerHTML == "remove tag" || atag[i].innerHTML == "ลบป้ายชื่อ"){
			_button(atag[i].href);
			break;
		}
	}
})();