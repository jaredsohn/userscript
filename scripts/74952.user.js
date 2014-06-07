// ==UserScript==
// @name           Lepro RatingColorizer
// @author         UnDetected
// @description    Добавляем наглядность рейтингам
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function(){
	doit(document.getElementsByClassName("rating"));
	function doit(e) {
		var l = e.length;
		for(i=0;i<l;i++) {
			var el = e[i].childNodes[0];
			var r = parseInt(el.innerHTML, 10);
			if(r != 0) el.style.color = (r > 0) ? "#0a0" : "#f00";
		}
	}
	// If DOM changed
	document.addEventListener("DOMNodeInserted", dc, false);	
	function dc(e) {
		if(e.target.className.indexOf("post") > -1) doit(e.target.getElementsByClassName("rating"));
	}
})();