// ==UserScript==
// @name           Add Timeline Links
// @namespace      stackoverflow
// @description    Add timeline links to every questions
// @include        http://meta.stackoverflow.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://*.stackexchange.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
	var start=function(){
		$(".post-menu").each(function(){
			id=$(this).find("a[id^=flag]").attr("id").replace(/\D+/, "");
			rlink = $("<span class='lsep'>|</span><a href='/posts/"+id+"/timeline'>timeline</a>");
			$(this).append(rlink);
			return false;
		});
		$('.question-hyperlink').each(function(){
			id=$(this).attr('href').replace(/\D+(\d+).*/g,'$1');
			$('<a href="/posts/'+id+'/timeline" title="timeline"> Δ&nbsp;</a>').insertAfter(this);
		});
	};

	if(window.$){
		start();
	}else{
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.textContent = "(" + start + ")();";
		document.body.appendChild(script);
	}
})();