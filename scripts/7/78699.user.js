// ==UserScript==
// @name           soundcloud hide comments
// @author         1allen (1all3n@gmail.com)
// @namespace      http://walk-alone.ru
// @description    soundcloud hide comments
// @include        http://www.sonudcloud.com/*
// @include        http://soundcloud.com/*
// ==/UserScript==

(function(){

	document
	.addEventListener('DOMNodeInserted',
		function(){
			var players = document.getElementsByClassName("player");
			if(!!players)
				for ( var i=0;i<players.length;i++)
					addClass(players[i],'no-comments');
		}, 
		false);

	function hasClass(el, name) {
	   return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
	}
	function addClass(el, name)
	{
	   if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
	}

})();