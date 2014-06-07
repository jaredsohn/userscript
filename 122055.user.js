// ==UserScript==
// @name           Commentcloud
// @namespace      Commentcloud
// @include        http://soundcloud.com/*
// ==/UserScript==

function commentclound(){
	$(document).ready(function(){

		$(".comments-toggle").each(function(){
			$(this).trigger("click");
		});

	});
}


var s = document.createElement("script");
s.innerHTML = commentclound + " commentclound();";
document.body.appendChild(s);