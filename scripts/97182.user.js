// ==UserScript==
// @name           s/\d+/\\d+/
// @namespace      stackoverflow
// @description    s/\d+/\\d+/
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*stackexchange.com/*
// @include        http://*stackapps.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
	var start=function(){
		$(".user-info,.started").each(function(){
			if(/\d+\s*[sm]/.test($(this).find(".relativetime").text())){
				$(this).find(".reputation-score").text("\\d+");
				$(this).find(".badgecount").each(function(){
					$(this).text("?");
					$(this).parent().attr("title",$(this).parent().attr("title").replace(/\d+/,"\\d+"));
				});
			}
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