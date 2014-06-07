// ==UserScript==
// @name         StackExchange Timeline Links
// @namespace    stackoverflow
// @description  Add a timeline link to current question in the whole Stack Exchange Network
// @include      http://*stackoverflow.com/*
// @include      http://*superuser.com/*
// @include      http://*serverfault.com/*
// @include      http://*stackexchange.com/*
// @include      http://*askubuntu.com/*
// @include      http://*onstartups.com/*
// @include      http://*nothingtoinstall.com/*
// @include      http://*seasonedadvice.com/*
// @include      http://*stackapps.com/*
// @exclude       http://chat*stackexchange.com/*
// @exclude       http://api*stackexchange.com/*
// @exclude       http://data*stackexchange.com/*
// @exclude       */reputation
// ==/UserScript==

(function(){
	var start=function(){
		id = $(".question").eq(0).attr("data-questionid").replace(/\D+/, "");
		rlink = $("<span class='lsep'>|</span><a href='/posts/"+id+"/timeline'>timeline</a>");
		$(".post-menu").each(function(){
			$(this).append(rlink);
			return false;
		});
	};

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + start + ")();";
	document.body.appendChild(script);
})();