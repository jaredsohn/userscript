// ==UserScript==
// @name           StackExchange Share on Google Plus
// @namespace      stackoverflow
// @description    Add a "plus one" button besides the question title
// @include        http://meta.stackoverflow.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://*.stackexchange.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
	var start=function(){
		$("#question-header h1").each(function(){
			var rlink = $("<span/>").html('&nbsp;<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script><g:plusone></g:plusone>');
			$(this).append(rlink);
			return false;
		});
	};

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + start + ")();";
	document.body.appendChild(script);
})();