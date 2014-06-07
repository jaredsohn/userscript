// ==UserScript==
// @name           Google Lucky (Ctrl+Enter)
// @namespace      http://c.partiot.free.fr
// @description    [Ctrl]+[Enter] -> "I'm Feeling Lucky"
// @include        http://*.google.*/*
// ==/UserScript==

(function(){
	var g=document.getElementsByClassName;
	var text=g('lst');
	if(text.length<1)
		return;
	text=text[0];
	
	var btn=g('lsb');
	if(btn.length<2)
		return;
	btn=btn[1];
	btn.title="[ctrl]+[enter]";
		
	function checkKeydown(e) {
		if (e.keyCode == 13 && (e.ctrlKey || e.metaKey)) {
			if(text.value=="")
			{
				setTimeout(function(){text.focus();},0);
				return false;
			}
			 // ctrl-enter
			btn.click();
		}
	};
	text.addEventListener("keydown", checkKeydown, 0);
})();