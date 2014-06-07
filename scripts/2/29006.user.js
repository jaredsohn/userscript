// ==UserScript==
// @name          Auto-reload Twitter
// @namespace     http://chris4403.blogspot.com/userscripts
// @description   Reloads Twitter every minute, except when selecting the textfield.  
// @author		  YOSHIOMI KURISU / enhanced by Eric Eggert (http://yatil.de/)
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://twitter.com/account/archive
// @include       https://twitter.com/account/archive
// @exclude       http://twitter.com/account/setting
// @exclude       https://twitter.com/account/setting
// @exclude       http://twitter.com/
// @exclude       https://twitter.com/
// @exclude       http://twitter.com/*/statuses/*
// @exclude       https://twitter.com/*/statuses/*
// ==/UserScript==

(function () {
    if (window.fluid) {
		var reloadFunc = function(){
		window.location.href = window.location.href;
	};
	reloadFunc.timerId = setTimeout(reloadFunc,60000);
	var s = document.getElementById('status');
	var u = document.getElementById('update-submit');
	if(s){                                                                                
		s.addEventListener('keyup', function(){clearTimeout(reloadFunc.timerId);}, false);
		s.addEventListener('click', function(){clearTimeout(reloadFunc.timerId);}, false);
		s.addEventListener('blur',  function(){reloadFunc.timerId = setTimeout(reloadFunc,60000);}, false);
	}                                                                                                      
	if(u){
		u.addEventListener('submit',  function(){reloadFunc.timerId = setTimeout(reloadFunc,10000);}, false);
	}
    }
})();