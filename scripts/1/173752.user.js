document.addEventListener('DOMContentLoaded', function(e){
	var e = Notifier.pushEvent;
	Notifier.pushEvent=function(){
		if(arguments[0].match(/call_start/)){
			if(localStorage.call==arguments[0]) return 0;
			localStorage.call=arguments[0];
		}
		return e.apply(this, arguments);
	};
});
// ==UserScript==
// @name vkontakte call run once
// @include http://vk.com/*
// ==/UserScript==