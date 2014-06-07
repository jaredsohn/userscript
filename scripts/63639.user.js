// ==UserScript==
// @name           4chan Commentbox Expansion
// @namespace      SEACATS
// @description    Basically like the one on /adv/ but without the slide.  
// @include        http://*.4chan.org/*
// ==/UserScript==

(function(){	
	function $(s){return document.querySelectorAll(s);}
	var commentBox = $("textarea[name='com']")[0];
	var s = true;
	with(commentBox.parentNode.parentNode.childNodes[1]){
		addEventListener("click",function(){
			commentBox.style.height = s ? "330px" : "inherit";
			commentBox.style.width = s ? "600px" : "inherit";
			commentBox.focus();
			s = !s;
			title = s ? "Click to expand the comment box" : "Click to contract the comment box";

		},false)
		style.cursor = "pointer";
		title = "Click to expand the comment box";
	}
})();	