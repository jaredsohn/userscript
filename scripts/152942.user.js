// ==UserScript==
// @name        Исправление работы кнопки home в FF для перемещения в начало ленты.
// @namespace   google
// @include     https://plus.google.com/*
// @version     1.1
// ==/UserScript==

(function(){
	var keyfunc=function(e){
	if (e.keyCode==36)
		if (e.target.contentEditable=="true")
			return true;
		else
			document.getElementsByTagName('html')[0].scrollTop=0
	};
	window.addEventListener('keypress',keyfunc,true);
})();
