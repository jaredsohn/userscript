// ==UserScript==
// @name           Add Revision Link
// @namespace      stackoverflow
// @description    Add Revision Link to post-menu
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*stackexchange.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
	var start=function(){
		$(".post-menu").each(function(){
			id=$(this).find("a[id^=flag]").attr("id").replace(/\D+/, "");
			$(this).append('<span class="lsep">|</span><a href="/posts/'+id+'/revisions">revisions</a>');
		});
		$(".revcell3.vm>div").each(function(){
			guid=$(this).find("a").attr("href").match(/\w{8}(?:-\w{4}){3}-\w{12}/)[0];
			$(this).prepend('<a href="#rev'+guid+'">link</a><span class="lsep">|</span>');
		});
	};
	if(windows.$ && window.initTagMenu){
		start();
	}else{
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.textContent = "(" + start + ")();";
		document.body.appendChild(script);
	}
})();