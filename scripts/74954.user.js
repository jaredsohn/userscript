// ==UserScript==
// @name           Lepro WhoIsWho
// @author         UnDetected
// @description    Наглядность половой принадлежности =)
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function(){
	doit(document.getElementsByClassName('p'));
	function doit(e) {
		var sc = /comments/;
		l = sc.test(document.body.className) ? 3 : 1;
		for(i = 0; i < e.length; i++) {
			e[i].childNodes[l].style.color = hl(e[i].innerHTML);
//			e[i].childNodes[l].style.fontWeight = "bold";
		}	
	}
	function hl(e) {
		var sw = /Написала/;
		return sw.test(e) ? "#f00" : "#00f";
	}
	// If DOM changed
	document.addEventListener("DOMNodeInserted", dc, false);	
	function dc(e) {
		if(e.target.className.indexOf("post") > -1) doit(e.target.getElementsByClassName('p'));
	}
})();